import { ref, toRef, toRefs, watch } from 'vue';

import { Story } from '@storybook/vue3';

import Basemap from '@arcgis/core/Basemap';
import { Extent } from '@arcgis/core/geometry';
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
  components: { Component },
  setup: (props) => {
    const basemap: Basemap = new Basemap({
      baseLayers: [
        new TileLayer({
          url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer',
        }),
      ],
    });

    const zoom = ref(args.zoom);

    return {
      ...args,
      map: new EsriMap({
        basemap,
      }),
      zoom,
      changeZoom(z: number) {
        zoom.value = z;
      },
    };
  },
  template: `<Component :map="map" :extent="extent" :zoom="zoom" class="h-screen" @zoom-change="changeZoom" @extent-change="onExtent" />`,
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
};
