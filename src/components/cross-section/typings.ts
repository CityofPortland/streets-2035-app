export const PRIORITIES = ['high', 'low', 'none'] as const;

export type Priority = typeof PRIORITIES[number];

export type PrioritySet = {
  pedestrian: Priority;
  bicycle: Priority;
  transit: Priority;
  freight: Priority;
  traffic: Priority;
};
