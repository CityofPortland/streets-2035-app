import { computed, ComputedRef, Ref } from 'vue';
import database from './database.json';

export type SidewalkPortion = {
  standardWidth: number;
  comment: string;
  issues: Array<{
    width: number;
    comment: string;
  }>;
};

export type Sidewalk = {
  streetType: string;
  pedestrianDistrict?: boolean;
  curb: Partial<SidewalkPortion>;
  furnishings: SidewalkPortion;
  pedestrians: SidewalkPortion;
  frontage: SidewalkPortion;
};

export const useSidewalk = (
  streetType: Ref<string>,
  pedestrianDistrict: Ref<boolean>
): { sidewalk: ComputedRef<Sidewalk | undefined> } => {
  return {
    sidewalk: computed(() =>
      database.find(
        (x) =>
          x.streetType == streetType.value &&
          (x.pedestrianDistrict
            ? x.pedestrianDistrict == pedestrianDistrict.value
            : true)
      )
    ),
  };
};
