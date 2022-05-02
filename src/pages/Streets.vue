<template>
  <div
    class="flex flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-row"
  >
    <h1 class="sr-only">Street listings</h1>
    <section
      class="w-full sm:w-1/3 md:w-full lg:w-1/3 xl:w-1/4 h-full sm:h-(screen-16) md:h-full lg:h-(screen-16) overflow-y-auto"
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
          name="Settings"
          @toggle="open = !open"
        >
          <fieldset class="p-2 grid grid-cols-1 gap-1">
            <div
              v-for="c in classifications"
              :key="c.value"
              class="flex items-center space-x-1"
            >
              <Toggle
                :id="`classification-${c.value.toLowerCase()}`"
                :name="`classification-${c.value.toLowerCase()}`"
                :label="c.label"
                :modelValue="c.enabled"
                @update:modelValue="handleClassificationToggle(c)"
              >
                <label
                  :id="`classification-${c.value.toLowerCase()}-label`"
                  :for="`classification-${c.value.toLowerCase()}`"
                  class="inline-flex items-center space-x-1"
                >
                  <i
                    class="w-5 h-5 border border-current rounded"
                    :style="{ 'background-color': c.symbol.value.formatRgb() }"
                  />
                  <span>{{ c.label }}</span>
                </label>
              </Toggle>
            </div>
          </fieldset>
        </Panel>
        <ul v-if="streets.length" class="grid grid-cols-1 gap-3">
          <li v-for="street in streets" :key="street.hash">
            <Section
              :street="street"
              @highlight-section="
                highlightStreet({ type: 'section', data: $event })
              "
              @highlight-segment="
                highlightStreet({ type: 'segment', data: $event })
              "
            />
            <!-- <Listing :street="street" @highlight="highlightStreet(street)" /> -->
          </li>
        </ul>
        <Message v-else color="blue" variant="light" icon="information">
          <p>{{ message }}</p>
        </Message>
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
      class="w-full sm:w-2/3 md:w-full lg:w-2/3 xl:w-3/4 h-screen-50 sm:h-(screen-16) md:h-screen-50 lg:h-(screen-16) overflow-y-auto"
    >
      <MapVue
        id="streets"
        :map="map"
        :extent="defaultExtent"
        :center="center"
        :zoom="zoom"
        :options="{
          highlightOptions: {
            color: '#FF9494',
            fillOpacity: 0.8,
            haloColor: '#E65C5C',
            haloOpacity: 1,
          },
        }"
        @zoom-change="handleZoom"
        @extent-change="handleExtent"
        @click-hit="handleClick"
        @layer-view="handleLayerView"
        @pointer-hit="handlePointer"
      >
        <template v-slot:top-right>
          <section
            v-if="pointer"
            class="p-2 border border-black rounded-md shadow bg-white overflow-auto flex flex-col"
          >
            <span class="font-semibold text-lg">{{ pointer.name }}</span>
            <span class="text-gray-700">{{
              classificationLabel('design', pointer.classifications?.design)
            }}</span>
          </section>
        </template>
        <template v-slot:bottom-right> </template>
      </MapVue>
    </section>
  </div>
</template>

<script lang="ts">
import Basemap from '@arcgis/core/Basemap';
import EsriMap from '@arcgis/core/Map';
import Extent from '@arcgis/core/geometry/Extent';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import LayerView from '@arcgis/core/views/layers/LayerView';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import TileLayer from '@arcgis/core/layers/TileLayer';
import { whenFalseOnce } from '@arcgis/core/core/watchUtils';
import along from '@turf/along';
import { lineString } from '@turf/helpers';
import length from '@turf/length';
import md5 from 'crypto-js/md5';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import AddressSuggest from '@/components/address-suggest/AddressSuggest.vue';
import Candidate from '@/components/address-suggest/Candidate.vue';
import { Candidate as TCandidate } from '@/components/address-suggest/candidate';
import CandidateList from '@/components/address-suggest/CandidateList.vue';
import Full from '@/components/street/Full.vue';
import MapVue from '@/components/map/Map.vue';
import Message from '@/components/message/Message.vue';
import Panel from '@/components/panel/Panel.vue';
import Section from '@/components/street/Section.vue';
import { Street, StreetSection } from '@/components/street/street';
import Toggle from '@/elements/inputs/Toggle.vue';
import { query } from '@/composables/use-graphql';
import {
  useStreetClassification,
  ViewModel,
} from '@/composables/use-street-classification';
import { ESRIStreet, useStreet } from '@/composables/use-street';

const MESSAGES = {
  ZOOM_IN: 'You must zoom in further to view listings of streets',
  ENABLE_CLASSIFICATION:
    'You must enable a classification to view listings of streets',
};

export default defineComponent({
  components: {
    AddressSuggest,
    Candidate,
    CandidateList,
    Full,
    MapVue,
    Message,
    Section,
    Panel,
    Toggle,
  },
  setup() {
    const street = ref<Partial<Street> | undefined>(undefined);
    const streets = ref<Array<Partial<StreetSection>>>([]);
    const message = ref(MESSAGES.ZOOM_IN);
    const open = ref(true);
    const showCandidates = ref(false);
    const candidates = ref(new Array<TCandidate>());
    const pointer = ref<Partial<Street> | undefined>(undefined);
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
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/22',
        outFields: ['*'],
      }),
      new TileLayer({
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Labels/MapServer',
      }),
    ];
    const map = new EsriMap({
      basemap,
      layers,
    });
    const defaultExtent = ref<Extent>(
      new Extent({
        spatialReference: { wkid: 102100 },
        xmin: -13674088.5469,
        ymin: 5689892.284199998,
        xmax: -13633591.503800001,
        ymax: 5724489.626800001,
      }).toJSON()
    );
    let extent = new Extent(defaultExtent.value);
    const center = ref<Partial<Point>>({});
    const zoom = ref(12);
    const layerViews = new Map<string, Promise<FeatureLayerView>>();

    const { push } = useRouter();
    const { params } = useRoute();
    const { models, classificationLabel } = useStreetClassification();
    const { convertStreet, retrieveStreet } = useStreet();

    const classifications = computed(() => {
      return models.filter((m) => m.group === 'design');
    });

    const getStreet = async (id: string | string[]) => {
      const street = await retrieveStreet({
        street: {
          id: Array.isArray(id) ? id[0] : id,
        },
        classifications: [
          'design',
          'pedestrian',
          'bicycle',
          'transit',
          'freight',
          'emergency',
          'traffic',
        ],
      });

      return street[0];
    };

    const createListings = async () => {
      if (extent.width <= 1 * 1000) {
        const s = await retrieveStreet({
          extent,
          classifications: ['design', 'bicycle', 'transit'],
        });

        streets.value = [
          ...s
            .filter((x) =>
              classifications.value
                .filter((c) => c.enabled)
                .find((c) => c.value == x.classifications.design)
            )
            .reduce<Map<string, StreetSection>>((acc, curr) => {
              const hash = md5(
                `${curr.name}:${curr.classifications.design}:${curr.classifications.bicycle}:${curr.classifications.transit}`
              ).toString();
              if (acc.has(hash)) {
                const section = acc.get(hash);
                if (section) {
                  section.segments.push(curr);
                  section.minWidth = Math.min(
                    section.minWidth || curr.width,
                    curr.width
                  );
                  section.maxWidth = Math.max(
                    section.maxWidth || curr.width,
                    curr.width
                  );
                }
              } else {
                acc.set(hash, {
                  hash,
                  segments: [curr],
                  minWidth: curr.width,
                  maxWidth: curr.width,
                  ...curr,
                });
              }
              return acc;
            }, new Map())
            .values(),
        ]
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
              sensitivity: 'base',
            })
          )
          .map((s) => {
            s.segments = s.segments.sort(
              (a, b) => (a.block || 0) - (b.block || 0)
            );
            return s;
          });

        if (!streets.value.length) {
          message.value = MESSAGES.ENABLE_CLASSIFICATION;
        }
      } else {
        streets.value = [];
        message.value = MESSAGES.ZOOM_IN;
      }
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

    const highlightStreet = async (options: {
      type: 'section' | 'segment';
      data: Partial<StreetSection> | Partial<Street>;
    }) => {
      const layerView = await layerViews.get('classifications');
      if (layerView) {
        whenFalseOnce(layerView, 'updating', () => {
          const query = layerView.layer.createQuery();
          const where =
            options.type == 'segment'
              ? `('${(options.data as Street).id}')`
              : `(${(options.data as StreetSection).segments.reduce(
                  (acc, curr, idx) => {
                    if (idx > 0) acc = acc.concat(',');
                    acc = acc.concat(`'${curr.id}'`);
                    return acc;
                  },
                  ''
                )})`;
          query.where = `TranPlanID IN ${where}`;
          layerView.queryFeatures(query).then((result) => {
            if (highlight) {
              highlight.remove();
            }
            highlight = layerView.highlight(result.features);
          });
        });
      }
    };

    const setupFeatureFilter = async () => {
      const layerView = await layerViews.get('classifications');
      if (layerView) {
        layerView.filter = new FeatureFilter({
          where: `Design in (${classifications.value
            .filter((c) => c.enabled)
            .map((c) => `'${c.value}'`)
            .join(',')})`,
        });
      }
    };

    onMounted(async () => {
      setupFeatureFilter();
      if (params.id) {
        street.value = await getStreet(params.id);
        if (street.value) {
          centerStreet(street.value);
          highlightStreet({ type: 'segment', data: street.value });
        }
      }
    });

    onBeforeRouteUpdate(async (to) => {
      if (to.params.id) {
        street.value = await getStreet(to.params.id);
        if (street.value) {
          centerStreet(street.value);
          highlightStreet({ type: 'segment', data: street.value });
        }
      } else {
        street.value = undefined;
        if (highlight) {
          highlight.remove();
        }
      }
    });

    return {
      street,
      streets,
      message,
      open,
      candidates,
      showCandidates,
      map,
      defaultExtent,
      center,
      zoom,
      classifications,
      pointer,
      classificationLabel,
      highlightStreet,
      handleLayerView: (data: { id: string; promise: Promise<LayerView> }) => {
        layerViews.set(data.id, data.promise as Promise<FeatureLayerView>);
      },
      async handleClassificationToggle(model: ViewModel) {
        const m = classifications.value.find((m) => m.value === model.value);
        if (m) m.enabled = !m.enabled;

        setupFeatureFilter();

        /*const layerView = await layerViews.get('classifications');
        if (layerView) {
          layerView.filter = new FeatureFilter({
            where: `Design in (${classifications.value
              .filter((c) => c.enabled)
              .map((c) => `'${c.value}'`)
              .join(',')})`,
          });
        }*/

        createListings();
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
      handleExtent(e: Extent) {
        extent = e;
        createListings();
      },
      handleClick(
        event: Array<{ graphic?: { attributes: ESRIStreet } } | undefined>
      ) {
        const street = event[0]?.graphic?.attributes;
        if (street) push(`/streets/${street.TranPlanID}`);
      },
      handlePointer(event: Array<{ graphic: { attributes: ESRIStreet } }>) {
        if (event && event.length > 0) {
          pointer.value = convertStreet(
            'esri',
            event[0].graphic.attributes
          ) as Partial<Street>;
        } else {
          pointer.value = undefined;
        }
      },
    };
  },
});
</script>
