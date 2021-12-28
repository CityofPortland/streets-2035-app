import Extent from '@arcgis/core/geometry/Extent';
import { LineString } from '@turf/helpers';

import { query } from './use-graphql';

export type ESRIStreet = {
  TranPlanID: string;
  StreetName: string;
  Design: string;
  Bicycle: string;
  Transit: string;
};

export type Street = {
  id: string;
  name: string;
  block?: number;
  width: number;
  classifications: Classifications;
  geometry: LineString;
};

export type Classifications = {
  design: string;
  transit: string;
  bicycle: string;
};

type RetrieveOptions = {
  classifications: Array<string>;
  street?: Partial<Street>;
  extent?: Extent;
};

export function useStreet() {
  return {
    convertStreet(
      sourceType: 'esri' | 'graphql',
      street: Street | ESRIStreet
    ): Partial<Street | ESRIStreet> {
      switch (sourceType) {
        case 'esri':
          street = street as ESRIStreet;
          return {
            id: street.TranPlanID,
            name: street.StreetName,
            classifications: {
              design: street.Design,
              bicycle: street.Bicycle,
              transit: street.Transit,
            },
          };
        case 'graphql':
          street = street as Street;
          return {
            TranPlanID: street.id,
            StreetName: street.name,
          };
      }
    },
    async retrieveStreet(options: RetrieveOptions): Promise<Array<Street>> {
      const { classifications, street, extent } = options;
      if (street) {
        if (extent) {
          console.error(
            'Both a street and extent were passed to `retrieveStreet`. Only the street will be used.'
          );
        }

        const { data } = await query<{ street: Array<Street> }>(`{
          street(id:"${street.id}") {
              id
              ${street.name ? '' : 'name'}
              ${street.block ? '' : 'block'}
              classifications {
                  ${classifications.join(' ')}
              }
          } }`);

        return data ? data.street : [];
      }

      if (extent) {
        const { xmin, ymin, xmax, ymax, spatialReference } = extent;
        const { data } = await query<{ streets: Array<Street> }>(`{
          streets(bbox:[${[xmin, ymin, xmax, ymax].join(
            ','
          )}], spatialReference:${spatialReference.wkid}) {
              id
              name
              block
              classifications {
                  ${classifications.join(' ')}
              }
          } }`);

        return data ? data.streets : [];
      }

      console.error(
        '🔥 Neither a street nor an extent were passed to `retrieveStreets`! Returning empty array...'
      );
      return [];
    },
  };
}
