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

const widthMap = new Map<number, { min: number; max: number }>([
  [36, { min: 34, max: 38 }],
  [40, { min: 40, max: 42 }],
  [44, { min: 43, max: 46 }],
  [50, { min: 48, max: 52 }],
  [56, { min: 54, max: 58 }],
  [60, { min: 60, max: 62 }],
  [66, { min: 64, max: 68 }],
  [76, { min: 74, max: 78 }],
]);

export const widths = Array.from(widthMap.keys());

const getClosestWidth = (width: number): number | undefined => {
  const closestWidth = Array.from(widthMap.entries()).find(
    (w) => width >= w[1].min && width <= w[1].max
  );
  return closestWidth ? closestWidth[0] : undefined;
};

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
        ['bicycle', { none: new Set(['LS']), low: new Set(['CB']) }],
        ['freight', { none: new Set([]), low: new Set(['MT', 'TA', 'LS']) }],
        ['pedestrian', { none: new Set([]), low: new Set(['LS', 'NW', 'CW']) }],
        [
          'traffic',
          { none: new Set(['RT', 'LS']), low: new Set(['DC', 'NC', 'TA']) },
        ],
        [
          'transit',
          { none: new Set(['RT', 'CT', 'LS', 'IPR']), low: new Set(['TA']) },
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
            query[`${classification}Priority`] = 'lower';
          } else {
            query[`${classification}Priority`] = 'higher';
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
