<template>
  <div
    class="flex flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-row"
  >
    <h1 class="sr-only">Street listings</h1>
    <section
      class="
        w-full
        sm:w-1/3
        md:w-full
        lg:w-1/3
        xl:w-1/4
        h-full
        sm:h-(screen-16)
        md:h-full
        lg:h-(screen-16)
        overflow-y-auto
      "
    >
      <section v-if="!street" class="p-4 grid grid-cols-1 gap-3">
        <address-suggest @search="handleSearch" />
        <CandidateList :open="showCandidates">
          <Candidate
            v-for="(c, index) in candidates"
            :key="index"
            :candidate="c"
            class="my-1 border rounded-lg shadow"
            @click="handleSelect(c)"
            @keyup.enter="handleSelect(c)"
            @keyup.space="handleSelect(c)"
          />
        </CandidateList>
        <Panel
          icon="cog"
          color="gray"
          variant="light"
          :open="open"
          name="Filters"
          @toggle="open = !open"
        >
        </Panel>
        <ul v-if="streets.length" class="grid grid-cols-1 gap-3">
          <li v-for="street in streets" :key="street.id">
            <Listing :street="street" @highlight="highlightStreet(street)" />
          </li>
        </ul>
      </section>
      <section v-else class="p-4 grid grid-cols-1 gap-3">
        <div>
          <router-link
            to="/streets"
            class="inline-flex border-b-2 border-current"
            >Back to search</router-link
          >
        </div>
        <Full :street="street" />
      </section>
    </section>
    <section
      class="
        w-full
        sm:w-2/3
        md:w-full
        lg:w-2/3
        xl:w-3/4
        h-screen-50
        sm:h-(screen-16)
        md:h-screen-50
        lg:h-(screen-16)
        overflow-y-auto
      "
    >
      <MapVue
        id="streets"
        :map="map"
        :extent="extent"
        :center="center"
        :zoom="zoom"
        @zoom-change="handleZoom"
        @extent-change="handleExtent"
        @click-hit="handleClick"
        @layer-view="handleLayerView"
      >
        <template v-slot:top-right> </template>
        <template v-slot:bottom-right> </template>
      </MapVue>
    </section>
  </div>
</template>

<script lang="ts">
import Basemap from '@arcgis/core/Basemap';
import EsriMap from '@arcgis/core/Map';
import Extent from '@arcgis/core/geometry/Extent';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import LayerView from '@arcgis/core/views/layers/LayerView';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import TileLayer from '@arcgis/core/layers/TileLayer';
import along from '@turf/along';
import { lineString } from '@turf/helpers';
import length from '@turf/length';

import { defineComponent, onMounted, provide, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import AddressSuggest from '@/components/address-suggest/AddressSuggest.vue';
import Candidate from '@/components/address-suggest/Candidate.vue';
import { Candidate as TCandidate } from '@/components/address-suggest/candidate';
import CandidateList from '@/components/address-suggest/CandidateList.vue';
import Full from '@/components/street/Full.vue';
import Listing from '@/components/street/Listing.vue';
import MapVue from '@/components/map/Map.vue';
import Panel from '@/components/panel/Panel.vue';
import { Street } from '@/components/street/street';
import { query } from '@/composables/use-graphql';

export default defineComponent({
  components: {
    AddressSuggest,
    Candidate,
    CandidateList,
    Full,
    Listing,
    MapVue,
    Panel,
  },
  setup() {
    const street = ref<Partial<Street> | undefined>(undefined);
    const streets = ref<Array<Partial<Street>>>([]);
    const open = ref(false);
    const showCandidates = ref(false);
    const candidates = ref(new Array<TCandidate>());
    const basemap: Basemap = new Basemap({
      baseLayers: [
        'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer',
        'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Buildings/MapServer',
        'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Taxlot_Labels/MapServer',
      ].flatMap((url) => new TileLayer({ url })),
    });
    const layers = [
      new FeatureLayer({
        id: 'classifications',
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/10',
        outFields: ['*'],
      }),
    ];
    const map = new EsriMap({
      basemap,
      layers,
    });
    const center = ref<Partial<Point>>({});
    const zoom = ref(12);
    const layerViews = new Map<string, LayerView>();

    const { push } = useRouter();
    const { params } = useRoute();

    const getStreet = async (id: string | string[]) => {
      const { data } = await query<{ street: Array<Street> }>(`{
        street(id:"${id}") {
          id
          name
          classifications {
            design
            pedestrian
            bicycle
            transit
            freight
            emergency
            traffic
          }
          geometry {
            coordinates
          }
        }
      }`);

      return data?.street[0];
    };

    const centerStreet = (street: Partial<Street>) => {
      if (street.geometry) {
        const line = lineString(street.geometry.coordinates);
        const midpoint = along(line, length(line, { units: 'feet' }) / 2, {
          units: 'feet',
        }).geometry.coordinates;

        center.value = {
          x: midpoint[0],
          y: midpoint[1],
          spatialReference: new SpatialReference({ wkid: 4326 }).toJSON(),
        };
      }
    };

    let highlight: { remove: () => void };

    const highlightStreet = (street: Partial<Street>) => {
      const layerView = layerViews.get('classifications') as FeatureLayerView;
      if (layerView) {
        const query = layerView.layer.createQuery();
        query.where = `TranPlanID = '${street.id}'`;
        layerView.queryFeatures(query).then((result) => {
          if (highlight) highlight.remove();
          highlight = layerView.highlight(result.features);
        });
      }
    };

    onMounted(async () => {
      if (params.id) {
        street.value = await getStreet(params.id);
        if (street.value) {
          centerStreet(street.value);
          highlightStreet(street.value);
        }
      }
    });

    onBeforeRouteUpdate(async (to) => {
      if (to.params.id) {
        street.value = await getStreet(to.params.id);
        // highlight the street
        // center on the midpoint
        if (street.value) {
          centerStreet(street.value);
          highlightStreet(street.value);
        }
        // add a graphic for higlighting the street
      } else {
        street.value = undefined;
        if (highlight) highlight.remove();
      }
    });

    return {
      street,
      streets,
      open,
      candidates,
      showCandidates,
      map,
      extent: {
        spatialReference: { wkid: 102100 },
        xmin: -13674088.5469,
        ymin: 5689892.284199998,
        xmax: -13633591.503800001,
        ymax: 5724489.626800001,
      },
      center,
      zoom,
      highlightStreet,
      handleLayerView: (layerView: LayerView) => {
        layerViews.set(layerView.layer.id, layerView);
      },
      async handleSearch({
        query: q,
        type,
      }: {
        query: string;
        type: 'address' | 'taxlot';
      }) {
        const { data } = await query<{ [index: string]: Array<TCandidate> }>(`
          {
            ${type}(search:"${q}", city:"portland") {
              id
              type
              name
              location {
                x
                y
                spatialReference {
                  wkid
                  latestWkid
                }
              }
              city
              state
            }
          }`);

        if (data && data[type]) {
          candidates.value = data[type];
          showCandidates.value = true;
        }
      },
      handleSelect(candidate: TCandidate) {
        showCandidates.value = false;
        // move map to location
        center.value = candidate.location;
      },
      handleZoom(z: number) {
        zoom.value = z;
      },
      handleExtent(extent: Extent) {
        // retrieve the streets within the extent if ~ one square km
        if (extent.width <= 1 * 1000) {
          extent.spatialReference.wkid;
          const layerView = layerViews.get(
            'classifications'
          ) as FeatureLayerView;
          if (layerView) {
            const query = layerView.layer.createQuery();
            query.outFields = [
              'TranPlanID',
              'StreetName',
              'Design',
              'Bicycle',
              'Transit',
            ];
            query.geometry = extent;
            layerView.queryFeatures(query).then((result) => {
              streets.value = result.features.map((graphic) => {
                const { TranPlanID, StreetName, Design, Bicycle, Transit } =
                  graphic.attributes;
                return {
                  id: TranPlanID,
                  name: StreetName,
                  classifications: {
                    design: Design,
                    bicycle: Bicycle,
                    transit: Transit,
                  },
                } as Street;
              });
            });
          }
        }
      },
      handleClick(
        event: Array<
          { graphic?: { attributes: { TranPlanID: string } } } | undefined
        >
      ) {
        const street = event[0]?.graphic?.attributes;
        if (street) push(`/streets/${street.TranPlanID}`);
      },
    };
  },
});
</script>
