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

export type Classifications = {
  design: string;
  pedestrian: string;
  bicycle: string;
  transit: string;
  freight: string;
  traffic: string;
};

export type Street = {
  id: string;
  name: string;
  block?: number;
  width: number;
  classifications: Classifications;
  geometry: LineString;
};

export type StreetSection = {
  hash: string;
  name: string;
  minWidth?: number;
  maxWidth?: number;
  classifications: Classifications;
  segments: Array<Partial<Street>>;
};

type RetrieveOptions = {
  classifications: Array<string>;
  street?: Partial<Street>;
  extent?: Pick<Extent, 'xmin' | 'ymin' | 'xmax' | 'ymax' | 'spatialReference'>;
};

export function useStreet(): {
  convertStreet(
    sourceType: 'esri' | 'graphql',
    street: Street | ESRIStreet | unknown
  ): Partial<Street | ESRIStreet> | undefined;
  retrieveStreet(options: RetrieveOptions): Promise<Array<Street>>;
} {
  return {
    convertStreet(sourceType: 'esri' | 'graphql', street: Street | ESRIStreet) {
      switch (sourceType) {
        case 'esri':
          street = street as ESRIStreet;
          return street.StreetName
            ? {
                id: street.TranPlanID,
                name: street.StreetName,
                classifications: {
                  design: street.Design,
                  bicycle: street.Bicycle,
                  transit: street.Transit,
                },
              }
            : undefined;
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

        const { data, errors } = await query<{ street: Array<Street> }>(`{
          street(id:"${street.id}") {
              id
              ${street.name ? '' : 'name'}
              ${street.block ? '' : 'block'}
              ${street.width ? '' : 'width'}
              classifications {
                  ${classifications.join(' ')}
              }
              geometry {
                type
                coordinates
              }
          } }`);

        if (errors) {
          throw new Error();
        }

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
              width
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
