import { computed, ComputedRef, Ref } from 'vue';

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

export function useCrossSectionClassification(street: Ref<Street>): {
  crossSectionClassification: ComputedRef;
} {
  const bike = new Set(['MCB', 'CB']);
  const transit = new Set(['MTP', 'RTMTP']);

  return {
    crossSectionClassification: computed(() =>
      street.value.classifications.bicycle &&
      bike.has(street.value.classifications.bicycle)
        ? street.value.classifications.transit &&
          transit.has(street.value.classifications.transit)
          ? 'both'
          : 'bike'
        : street.value.classifications.transit &&
          transit.has(street.value.classifications.transit)
        ? 'transit'
        : 'none'
    ),
  };
}

export function useCrossSectionProfile(
  width: Ref<number>,
  designClassification: Ref<string>,
  subClassification: Ref<string>
): {
  crossSectionProfile: ComputedRef;
} {
  return {
    crossSectionProfile: computed(
      () =>
        database[width.value][designClassification.value.toLowerCase()][
          subClassification.value.toLowerCase()
        ]
    ),
  };
}
