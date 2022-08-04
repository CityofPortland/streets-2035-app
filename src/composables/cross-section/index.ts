import { computed, ComputedRef, Ref } from 'vue';
import { LocationQuery, RouteLocation, useRouter } from 'vue-router';
import { Classifications, Street } from '../use-street';

import database from './database.json';

export default database;

export type CrossSection = {
  width: number;
  name: string;
  ordinal: number;
  'pedestrian:mobility': number;
  'pedestrian:access': number;
  greening: number;
  'bicycle:mobility': number;
  'bicycle:access': number;
  'transit:mobility': number;
  'transit:access': number;
  'freight:mobility': number;
  'freight:access': number;
  'traffic:mobility': number;
  'traffic:access': number;
  safety: number;
  continuousImage: string;
  episodicImages: Array<string>;
};

export const widths = Array.from(
  database.reduce((acc, curr) => acc.add(curr.width), new Set<number>())
);

const getClosestWidth = (width: number): number | undefined =>
  widths
    .filter((w) => w <= width)
    .sort((a, b) => b - a)
    .shift();

export function useCrossSection(street?: Ref<Partial<Street>>): {
  options: ComputedRef<Array<CrossSection>>;
  crossSectionRoute: ComputedRef<RouteLocation | undefined>;
} {
  const { resolve } = useRouter();

  return {
    options: computed(() =>
      database.filter((x) => x.width === street?.value.width)
    ),
    crossSectionRoute: computed(() => {
      if (!street || !street.value || !street.value.width) return undefined;

      const closestWidth = getClosestWidth(street.value.width);

      if (!closestWidth) return undefined;

      const query: LocationQuery = {};

      const classificationMap = new Map<
        keyof Classifications,
        { none: Set<string>; low: Set<string> }
      >([
        ['pedestrian', { none: new Set(), low: new Set('LS') }],
        ['bicycle', { none: new Set(['LS']), low: new Set() }],
        [
          'transit',
          { none: new Set(['RT', 'CT', 'LS', 'IPR']), low: new Set(['TA']) },
        ],
        ['freight', { none: new Set(['LS']), low: new Set(['TA']) }],
        [
          'traffic',
          { none: new Set(['RT', 'LS']), low: new Set(['DC', 'NC', 'TA']) },
        ],
      ]);

      if (street.value.classifications) {
        for (const classification of classificationMap.keys()) {
          const options = classificationMap.get(classification);
          if (options?.none.has(street.value.classifications[classification])) {
            query[`${classification}Priority`] = 'none';
          } else if (
            options?.low.has(street.value.classifications[classification])
          ) {
            query[`${classification}Priority`] = 'low';
          } else {
            query[`${classification}Priority`] = 'high';
          }
        }

        if (street.value.classifications.design) {
          const mainStreetClasses = new Set(['NMS', 'CIMS']);

          if (mainStreetClasses.has(street.value.classifications.design))
            query.mainStreet = 'true';
        }
      }

      return resolve({
        name: 'CrossSectionList',
        params: {
          width: closestWidth,
        },
        query,
      });
    }),
  };
}
