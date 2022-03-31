import { computed, ComputedRef, Ref } from 'vue';
import { RouteLocation, useRouter } from 'vue-router';

import { Classifications, Street } from '@/components/street/street';

import thirtySix from './36.json';
import forty from './40.json';
import fortyFour from './44.json';
import fifty from './50.json';
import fiftySix from './56.json';
import sixty from './60.json';
import sixtySix from './66.json';
import seventySix from './76.json';

const database: Record<
  number,
  Record<string, Record<string, Record<string, Array<string>>>>
> = {
  36: thirtySix,
  40: forty,
  44: fortyFour,
  50: fifty,
  56: fiftySix,
  60: sixty,
  66: sixtySix,
  76: seventySix,
};

export default database;

const getClosestWidth = (width: number): number | undefined =>
  Object.keys(database)
    .map((k) => parseInt(k))
    .filter((k) => k <= width)
    .sort((a, b) => b - a) // biggest to smallest
    .shift();

const hasCrossSection = (
  width: number,
  designClassification: string,
  subClassification: string
): boolean =>
  width &&
  database[width] &&
  database[width][designClassification] &&
  database[width][designClassification][subClassification]
    ? true
    : false;

function getSubClassification(classifications: Classifications): string {
  const bike = new Set(['MCB', 'CB']).has(classifications.bicycle);
  const transit = new Set(['MTP', 'RTMTP']).has(classifications.transit);

  return bike ? (transit ? 'both' : 'bike') : transit ? 'transit' : 'none';
}

export function useCrossSection(street: Ref<Partial<Street>>): {
  crossSectionLink: ComputedRef<RouteLocation | null>;
} {
  const { resolve } = useRouter();

  return {
    crossSectionLink: computed(() => {
      const { classifications } = street.value;
      let { width } = street.value;

      if (!classifications || !width) return null;

      width = getClosestWidth(width);

      if (!width) return null;

      const designClassification = classifications.design.toLowerCase();
      const subClassification = getSubClassification(classifications);

      return hasCrossSection(width, designClassification, subClassification)
        ? resolve({
            name: 'CrossSection',
            params: {
              width,
              designClassification,
              subClassification,
            },
          })
        : null;
    }),
  };
}
