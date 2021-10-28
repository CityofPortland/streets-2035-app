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
      <section class="p-4 grid grid-cols-1 gap-3">
        <address-suggest />
        <Panel
          icon="cog"
          color="gray"
          variant="light"
          :open="open"
          name="Filters"
          @toggle="open = !open"
        >
        </Panel>
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
      <Map :map="map" :zoom="zoom" :extent="extent">
        <template v-slot:top-right> </template>
        <template v-slot:bottom-right> </template>
      </Map>
    </section>
  </div>
</template>

<script lang="ts">
import Basemap from '@arcgis/core/Basemap';
import EsriMap from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import { defineComponent, ref } from 'vue';

import AddressSuggest from '@/components/address-suggest/AddressSuggest.vue';
import Map from '@/components/map/Map.vue';
import Panel from '@/components/panel/Panel.vue';

export default defineComponent({
  components: { AddressSuggest, Map, Panel },
  setup() {
    const open = ref(false);
    const basemap: Basemap = new Basemap({
      baseLayers: [
        new TileLayer({
          url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer',
        }),
      ],
    });

    const zoom = ref(12);

    const layers = [
      new FeatureLayer({
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/10',
        outFields: ['*'],
      }),
    ];

    return {
      open,
      map: new EsriMap({
        basemap,
        layers,
      }),
      extent: {
        spatialReference: { wkid: 102100 },
        xmin: -13674088.5469,
        ymin: 5689892.284199998,
        xmax: -13633591.503800001,
        ymax: 5724489.626800001,
      },
      zoom,
    };
  },
});
</script>
