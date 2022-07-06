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

export const widths = Array.from(
  database.reduce((acc, curr) => acc.add(curr.width), new Set<number>())
);

const getClosestWidth = (width: number): number | undefined =>
  widths
    .filter((w) => w <= width)
    .sort((a, b) => b - a)
    .shift();

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
