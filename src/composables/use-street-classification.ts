import UniqueValueInfo from '@arcgis/core/renderers/support/UniqueValueInfo';
import axios from 'axios';
import { rgb, RGBColorFactory } from 'd3-color';
import { computed, ComputedRef, inject, Ref } from 'vue';

import { Street, StreetSection } from '@/components/street/street';

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

export const STREET_CLASSIFICATION_KEY = 'streetClassifications';

export const getModels = async (): Promise<Array<ViewModel>> => {
  const models = new Array<ViewModel>();

  for (const value of classifications) {
    const res = await axios.get(value[1], {
      params: {
        f: 'json',
      },
    });

    if (res.data) {
      const renderer = res.data.drawingInfo.renderer;

      switch (renderer.type) {
        case 'uniqueValue':
          models.push(
            ...renderer.uniqueValueInfos.map((json: UniqueValueInfo) => {
              const info = UniqueValueInfo.fromJSON(json);
              const { r, g, b, a } = info.symbol.color;
              return {
                group: value[0],
                value: info.value.toString(),
                enabled: true,
                label: info.label,
                symbol: { type: 'color', value: rgb(r, g, b, a) },
              };
            })
          );
          break;
        case 'simple':
          models.push({
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
  }

  return models;
};

export function useStreetClassification(street?: Ref<Street | StreetSection>): {
  models: Array<ViewModel>;
  classificationKeys: ComputedRef<Array<string>>;
  classificationLabel: (type: string, value: string) => string;
} {
  const models = inject<Array<ViewModel>>(STREET_CLASSIFICATION_KEY);

  if (!models) {
    throw new Error('unable to find street classification models');
  }

  return {
    models,
    classificationKeys: computed(() =>
      Object.entries(street?.value.classifications ?? {})
        .filter((entry) => entry[1] != 'N/A')
        .map((entry) => entry[0])
    ),
    classificationLabel(type: string, value: string) {
      return (
        models.find((model) => {
          return (
            model.group == type &&
            model.value.localeCompare(value, undefined, {
              sensitivity: 'base',
            }) === 0
          );
        })?.label || 'N/A'
      );
    },
  };
}
