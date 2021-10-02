import { computed, ComputedRef, Ref } from 'vue';

import { Street } from '@/components/street/street';

import fifty from './50.json';

const database: Record<
  number,
  Record<string, Record<string, Record<string, Array<string>>>>
> = {
  50: fifty,
};

export default database;

export function useCrossSectionClassification(street: Ref<Street>): {
  crossSectionClassification: ComputedRef;
} {
  const bike = new Set(['MCB', 'CB']);
  const transit = new Set(['MTP', 'RTMTP']);

  return {
    crossSectionClassification: computed(() =>
      bike.has(street.value.classifications.bicycle)
        ? transit.has(street.value.classifications.transit)
          ? 'both'
          : 'bike'
        : transit.has(street.value.classifications.transit)
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
