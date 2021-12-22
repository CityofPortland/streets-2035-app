import { LineString } from '@turf/helpers';

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
  };
}
