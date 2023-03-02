import { Street } from '@/composables/use-street';
import UniqueValueInfo from '@arcgis/core/renderers/support/UniqueValueInfo';
import axios from 'axios';
import { rgb, RGBColorFactory } from 'd3-color';
import { defineStore } from 'pinia';

export type ViewModel = {
  group: string;
  value: string;
  enabled: boolean;
  label: string;
  symbol:
    | { type: 'color'; value: RGBColorFactory }
    | { type: 'image'; mime: string; value: string };
};

const classifications = new Map([
  [
    'pedestrian',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/27',
  ],
  [
    'bicycle',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/24',
  ],
  [
    'transit',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/15',
  ],
  [
    'freight',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/31',
  ],
  [
    'design',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/22',
  ],
  [
    'emergency',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/19',
  ],
  [
    'traffic',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/16',
  ],
  [
    'districts',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/28',
  ],
]);

export const useClassificationStore = defineStore('classification', {
  state: () => ({
    models: new Array<ViewModel>(),
  }),
  getters: {
    keys: () => (street: Street) =>
      Object.entries(street.classifications)
        .filter((entry) => entry[1] != 'N/A')
        .map((entry) => entry[0]),
    label:
      (state) =>
      (value: string, type = 'design') =>
        state.models.find((model) => {
          return (
            model.group == type &&
            model.value.localeCompare(value, undefined, {
              sensitivity: 'base',
            }) === 0
          );
        })?.label || 'N/A',
  },
  actions: {
    init() {
      classifications.forEach(async (value, key) => {
        try {
          const res = await axios.get(value, {
            params: {
              f: 'json',
            },
          });

          if (res.data) {
            const renderer = res.data.drawingInfo.renderer;

            switch (renderer.type) {
              case 'uniqueValue':
                this.models.push(
                  ...renderer.uniqueValueInfos.map((json: UniqueValueInfo) => {
                    const info = UniqueValueInfo.fromJSON(json);
                    const { r, g, b, a } = info.symbol.color;
                    return {
                      group: key,
                      value: info.value.toString(),
                      enabled: true,
                      label: info.label,
                      symbol: { type: 'color', value: rgb(r, g, b, a) },
                    };
                  })
                );
                break;
              case 'simple':
                this.models.push({
                  group: value[0],
                  value: 'undefined',
                  enabled: true,
                  label: res.data.name,
                  symbol: {
                    type: 'image',
                    mime: renderer.symbol.contentType,
                    value: renderer.symbol.imageData,
                  },
                });
                break;
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
    },
  },
});
