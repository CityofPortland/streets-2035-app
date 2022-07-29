<template>
  <Box as="header" class="flex flex-col gap-1">
    <slot></slot>
    <Box
      color="gray"
      variant="light"
      class="p-2 rounded-md font-bold grid grid-cols-2 gap-1 justify-items-center"
    >
      <span>Mobility</span>
      <span>Access</span>
    </Box>
  </Box>
  <Box
    :color="scoreColor(scores.safety)"
    variant="neutral"
    class="text-center p-2 rounded-md"
    title="Safety score"
  />
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['pedestrian:mobility'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Pedestrian mobility score"
      :class="{
        'low-priority': priorities.pedestrian == 'low',
        'no-priority': priorities.pedestrian == 'none',
      }"
    />
    <Box
      :color="scoreColor(scores['pedestrian:access'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Pedestrian access score"
      :class="{
        'low-priority': priorities.pedestrian == 'low',
        'no-priority': priorities.pedestrian == 'none',
      }"
    />
  </div>
  <Box
    :color="scoreColor(scores.greening)"
    variant="neutral"
    class="text-center p-2 rounded-md"
    title="Greening score"
  />
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['bicycle:mobility'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      :class="{
        'low-priority': priorities.bicycle == 'low',
        'no-priority': priorities.bicycle == 'none',
      }"
      title="Bicycle mobility score"
    />
    <Box
      :color="scoreColor(scores['bicycle:access'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      :class="{
        'low-priority': priorities.bicycle == 'low',
        'no-priority': priorities.bicycle == 'none',
      }"
      title="Bicycle access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['transit:mobility'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Transit mobility score"
      :class="{
        'low-priority': priorities.transit == 'low',
        'no-priority': priorities.transit == 'none',
      }"
    />
    <Box
      :color="scoreColor(scores['transit:access'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Transit access score"
      :class="{
        'low-priority': priorities.transit == 'low' && !mainStreet,
        'no-priority': priorities.transit == 'none',
      }"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['freight:mobility'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Freight mobility score"
      :class="{
        'low-priority': priorities.freight == 'low',
        'no-priority': priorities.freight == 'none',
      }"
    />
    <Box
      :color="scoreColor(scores['freight:access'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Freight access score"
      :class="{
        'low-priority': priorities.freight == 'low' && !mainStreet,
        'no-priority': priorities.freight == 'none',
      }"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['traffic:mobility'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Traffic mobility score"
      :class="{
        'low-priority': priorities.traffic == 'low',
        'no-priority': priorities.traffic == 'none',
      }"
    />
    <Box
      :color="scoreColor(scores['traffic:access'])"
      variant="neutral"
      class="text-center p-2 rounded-md"
      title="Traffic access score"
      :class="{
        'low-priority': priorities.traffic == 'low' && !mainStreet,
        'no-priority': priorities.traffic == 'none',
      }"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Box, { BoxColor } from '@/elements/box/Box';
import { PrioritySet } from './typings';

type ScoreSet = {
  safety: number;
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
};

export default defineComponent({
  name: 'Scorecard',
  components: { Box },
  props: {
    scores: {
      type: Object as () => ScoreSet,
      required: true,
    },
    mainStreet: {
      type: Boolean,
      default: false,
    },
    priorities: {
      type: Object as () => PrioritySet,
      default: () => ({
        pedestrian: 'high',
        bicycle: 'high',
        transit: 'high',
        freight: 'high',
        traffic: 'high',
      }),
    },
  },
  setup() {
    const scoreMap = new Map<number, BoxColor>([
      [1, 'red'],
      [2, 'tangerine'],
      [3, 'green'],
    ]);

    return {
      publicPath: process.env.BASE_URL,
      scoreColor: (score: number) => scoreMap.get(score),
    };
  },
});
</script>

<style scoped>
.low-priority {
  background-image: radial-gradient(
    circle at center,
    black 0%,
    transparent 50%
  );
  background-size: 4px 4px;
}
.no-priority {
  @apply bg-transparent;
}
</style>
