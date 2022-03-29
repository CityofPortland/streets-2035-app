import { computed, ComputedRef, Ref } from 'vue';
import { RouteLocation, useRouter } from 'vue-router';

import { Street } from '@/components/street/street';

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

function getCrossSectionLink(
  width: number | null,
  subClassification: string,
  design: string | null
): RouteLocation | null {
  const closestStreetWidth = Object.keys(database)
    .map((k) => parseInt(k))
    .filter((k) => width && k <= width)
    .sort((a, b) => b - a)
    .shift();

  //console.log('width', width);
  //console.log('database[width]', database[width] || null);
  //console.log('database[width][design]', database[width][design] || null);
  //console.log('design', design);

  if (
    closestStreetWidth &&
    database[closestStreetWidth] &&
    design &&
    database[closestStreetWidth][design] &&
    subClassification &&
    database[closestStreetWidth][design][subClassification]
  ) {
    const { resolve } = useRouter();

    return resolve({
      name: 'CrossSection',
      params: {
        width,
        designClassification: design,
        subClassification,
      },
    });
  } else {
    return null;
  }
}

export function useCrossSectionClassification(street: Street): string {
  const bike = new Set(['MCB', 'CB']);
  const transit = new Set(['MTP', 'RTMTP']);

  return street.classifications.bicycle &&
    bike.has(street.classifications.bicycle)
    ? street.classifications.transit &&
      transit.has(street.classifications.transit)
      ? 'both'
      : 'bike'
    : street.classifications.transit &&
      transit.has(street.classifications.transit)
    ? 'transit'
    : 'none';
}

export function useCrossSection(street: Ref<Street>): {
  crossSectionLink: ComputedRef<RouteLocation | null>;
} {
  const { width } = street.value;
  const subClassification = useCrossSectionClassification(street.value);
  let { design } = street.value.classifications;
  if (design) {
    design = design?.toLowerCase();
  }

  return {
    crossSectionLink: computed(() =>
      getCrossSectionLink(width, subClassification, design)
    ),
  };
}
