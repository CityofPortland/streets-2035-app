import { computed, ComputedRef, Ref } from 'vue';
import database from './database.json';

// Street Type	Curb	Furnishing	PTZ	Frontage	Total
// Civic Main Street in PD	0.5	4	8	2.5	15
// Civic Main Street	0.5	4	6	1.5	12
// Civic Corridor	0.5	4	6	1.5	12
// Neighborhood Main Street in PD	0.5	4	8	2.5	15
// Neighborhood Main Street	0.5	4	6	1.5	12
// Neighborhood Corridor	0.5	4	6	1.5	12
// Community Corridor	0.5	4	6	1.5	12
// Local Street	0.5	4	6	0.5	11
// Industrial Road	0.5	5	6	0.5	12
// Regional Corridor	0.5	5	6	0.5	12
// Local Street in PD	0.5	4	6	1.5	12

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
  pedestrianDistrict: boolean;
  curb: Partial<SidewalkPortion>;
  furnishings: Partial<SidewalkPortion>;
  pedestrians: Partial<SidewalkPortion>;
  frontage: Partial<SidewalkPortion>;
};

export const useSidewalk = (
  streetType: Ref<string>,
  pedestrianDistrict: Ref<boolean>
): ComputedRef<Sidewalk | undefined> => {
  return computed(() =>
    database.find(
      (x) =>
        x.streetType == streetType.value &&
        x.pedestrianDistrict == pedestrianDistrict.value
    )
  );
};
