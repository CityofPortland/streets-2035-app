import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import Basemap from '@arcgis/core/Basemap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import EsriMap from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';

import Component from './Map.vue';

export default {
  title: 'Component/Map',
  component: Component,
  argTypes: {
    onExtent: { action: 'extent' },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Map: Component },
  setup: () => {
    const basemap: Basemap = new Basemap({
      baseLayers: [
        new TileLayer({
          url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer',
        }),
      ],
    });

    const zoom = ref(args.zoom);
    const click = ref('');
    const pointer = ref('');

    const layers = [new FeatureLayer({ url: args.layer, outFields: ['*'] })];

    return {
      ...args,
      map: new EsriMap({
        basemap,
        layers,
      }),
      zoom, // overrides arg/prop zoom with reactive version
      click,
      pointer,
      changeZoom(z: number) {
        zoom.value = z;
      },
      handleClick(event: unknown) {
        click.value = JSON.stringify(event, null, 2);
      },
      handlePointer(event: Array<unknown>) {
        pointer.value = JSON.stringify(event, null, 2);
      },
    };
  },
  template: `
  <Map
    :map="map"
    :extent="extent"
    :zoom="zoom"
    style="height: calc(100vh - 2rem);"
    @zoom-change="changeZoom"
    @extent-change="onExtent"
    @click="handleClick"
    @pointer-hit="handlePointer"
    >
    <template v-slot:top-right>
        <section v-if="click" class="w-64 max-h-40 p-1 border-2 border-black rounded shadow bg-white text-sm overflow-auto">
            <header><h2 class="font-semibold">Click event:</h2></header>
            <div>{{ click }}</div>
        </section>
    </template>
    <template v-slot:bottom-right>
        <section v-if="pointer && pointer.length > 0" class="w-64 max-h-40 p-1 border-2 border-black rounded shadow bg-white text-sm overflow-auto">
            <header><h2 class="font-semibold">Pointer hit event:</h2></header>
            <div>{{ pointer }}</div>
        </section>
    </template>
  </Map>`,
});

export const Map = Template.bind({});
Map.args = {
  extent: {
    spatialReference: { wkid: 102100 },
    xmin: -13674088.5469,
    ymin: 5689892.284199998,
    xmax: -13633591.503800001,
    ymax: 5724489.626800001,
  },
  zoom: 12,
  layer:
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/10',
};
