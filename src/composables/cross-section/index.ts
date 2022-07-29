import { computed, ComputedRef, Ref } from 'vue';
import { LocationQuery, RouteLocation, useRouter } from 'vue-router';

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

export function useCrossSection(
  width: Ref<number>,
  designClass?: Ref<string>
): {
  options: ComputedRef<Array<CrossSection>>;
  crossSectionRoute: ComputedRef<RouteLocation | null>;
} {
  const { resolve } = useRouter();

  return {
    options: computed(() => database.filter((x) => x.width === width.value)),
    crossSectionRoute: computed(() => {
      const closestWidth = getClosestWidth(width.value);

      if (!closestWidth) return null;

      const query: LocationQuery = {};

      if (designClass) {
        const mainStreetClasses = new Set(['NMS', 'CIMS']);
        const corridorClasses = new Set(['CC', 'CIC', 'NC']);

        if (mainStreetClasses.has(designClass.value)) query.mainStreet = 'true';
        if (corridorClasses.has(designClass.value)) query.corridor = 'true';
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
