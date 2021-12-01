import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import UniqueValueInfo from '@arcgis/core/renderers/support/UniqueValueInfo';
import axios from 'axios';
import { rgb, RGBColorFactory } from 'd3-color';
import { computed, ComputedRef, inject, Ref } from 'vue';

import { Street } from '@/components/street/street';

export type ViewModel = {
  group: string;
  value: string;
  enabled: false;
  label: string;
  symbol: { type: 'color'; value: RGBColorFactory };
  layer: FeatureLayer;
};

const classifications = new Map([
  [
    'pedestrian',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/15',
  ],
  [
    'bicycle',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/12',
  ],
  [
    'transit',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/3',
  ],
  [
    'freight',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/19',
  ],
  [
    'design',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/10',
  ],
  [
    'emergency',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7',
  ],
  [
    'traffic',
    'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4',
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
      models.push(
        ...res.data.drawingInfo.renderer.uniqueValueInfos.map(
          (json: UniqueValueInfo) => {
            const info = UniqueValueInfo.fromJSON(json);
            const { r, g, b, a } = info.symbol.color;
            return {
              group: value[0],
              value: info.value.toString(),
              enabled: false,
              label: info.label,
              symbol: { type: 'color', value: rgb(r, g, b, a) },
              layer: new FeatureLayer({
                url: value[1],
                outFields: ['*'],
                definitionExpression: `${
                  value[0]
                } = '${info.value.toString()}'`,
                visible: false,
              }),
            };
          }
        )
      );
    }
  }

  return models;
};

export function useStreetClassification(street?: Ref<Street>): {
  models: Ref<Array<ViewModel>>;
  classificationKeys: ComputedRef<Array<string>>;
  classificationLabel: (type: string, value: string) => string;
} {
  const models = inject<Ref<Array<ViewModel>>>(STREET_CLASSIFICATION_KEY);

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
        models.value.find((model) => {
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
