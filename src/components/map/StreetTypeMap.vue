<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:h-64">
    <ul v-if="streets.length" class="flex flex-col gap-2">
      <li v-for="street in streets" :key="street.hash">
        <Section :street="street" @highlight-section="highlightStreet" />
      </li>
    </ul>
    <MapVue
      :map="map"
      :extent="extent"
      :zoom="zoom"
      :options="{
        highlightOptions: {
          color: '#FF9494',
          fillOpacity: 0.8,
          haloColor: '#E65C5C',
          haloOpacity: 1,
        },
      }"
      class="border border-current shadow-md h-64 md:h-64"
      @zoom-change="handleZoom"
      @pointer-hit="handlePointer"
      @layer-view="handleLayerView"
      @extent-change="handleExtent"
    >
      <template v-slot:top-right>
        <div
          v-if="pointer"
          class="p-2 border border-black rounded-md shadow bg-white overflow-auto"
        >
          <span class="font-semibold text-lg">{{ pointer.StreetName }}</span>
        </div>
      </template>
    </MapVue>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import md5 from 'crypto-js/md5';

import Basemap from '@arcgis/core/Basemap';
import EsriMap from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import LayerView from '@arcgis/core/views/layers/LayerView';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Extent from '@arcgis/core/geometry/Extent';
import { whenOnce } from '@arcgis/core/core/reactiveUtils';

import { ESRIStreet, StreetSection } from '@/composables/use-street';
import MapVue from '@/components/map/Map.vue';
import Section from '@/components/street/Section.vue';

export default defineComponent({
  name: 'StreetTypeMap',
  components: {
    MapVue,
    Section,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const layerViews = new Map<string, Promise<FeatureLayerView>>();

    const extent = {
      spatialReference: { wkid: 102100 },
      xmin: -13674088.5469,
      ymin: 5689892.284199998,
      xmax: -13633591.503800001,
      ymax: 5724489.626800001,
    };

    const map = new EsriMap({
      basemap: new Basemap({
        baseLayers: [
          new TileLayer({
            url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer',
          }),
        ],
      }),
      layers: [
        new FeatureLayer({
          id: 'classifications',
          url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/22',
          outFields: ['*'],
          definitionExpression: `Design = '${props.type.toUpperCase()}'`,
        }),
        new TileLayer({
          id: 'labels',
          url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Labels/MapServer',
        }),
      ],
    });
    const zoom = ref(12);
    const pointer = ref<ESRIStreet | undefined>(undefined);
    const streets = ref<Array<Partial<StreetSection>>>([]);

    let highlight: { remove: () => void };

    return {
      extent,
      map,
      pointer,
      streets,
      zoom,
      async handleExtent(extent: Extent) {
        const layerView = await layerViews.get('classifications');

        if (layerView) {
          console.log('querying layerview...');
          console.log(extent.toJSON());

          const query = layerView.createQuery();
          query.outFields = ['StreetName'];
          query.geometry = extent;
          query.spatialRelationship = 'envelope-intersects';

          await whenOnce(() => !layerView.updating);
          const features = await layerView.queryFeatures(query);

          console.log(`got ${features.features.length} features!`);

          if (features) {
            const shuffle = (
              array: Array<Pick<StreetSection, 'hash' | 'name'>>
            ) => {
              let m = array.length,
                t,
                i;

              // While there remain elements to shuffle…
              while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
              }

              return array;
            };

            streets.value = shuffle([
              ...features.features
                .reduce((acc, curr) => {
                  const hash = md5(`${curr.attributes.StreetName}`).toString();

                  if (!acc.has(hash)) {
                    acc.set(hash, {
                      hash,
                      name: curr.attributes.StreetName,
                    });
                  }

                  return acc;
                }, new Map<string, Pick<StreetSection, 'hash' | 'name'>>())
                .values(),
            ]).splice(0, 5);
          }
        }
      },
      handleLayerView(data: { id: string; promise: Promise<LayerView> }) {
        layerViews.set(data.id, data.promise as Promise<FeatureLayerView>);
      },
      handlePointer(event: Array<{ graphic: { attributes: ESRIStreet } }>) {
        if (event && event.length > 0) {
          pointer.value = event[0].graphic.attributes;
        } else {
          pointer.value = undefined;
        }
      },
      async highlightStreet(section: StreetSection) {
        const layerView = await layerViews.get('classifications');

        if (layerView) {
          const query = layerView.createQuery();
          query.where = `StreetName = '${section.name}'`;

          const features = await layerView.queryFeatures(query);
          if (features.features.length) {
            if (highlight) {
              highlight.remove();
            }
            highlight = layerView.highlight(features.features);
          }
        }
      },
      handleZoom(z: number) {
        zoom.value = z;
      },
    };
  },
});
</script>
