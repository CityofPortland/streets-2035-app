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
  <Scorebox :score="scores.safety" title="Safety score" />
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['pedestrian:mobility']"
      :priority="priorities.pedestrian"
      title="Pedestrian mobility score"
    />
    <Scorebox
      :score="scores['pedestrian:access']"
      :priority="priorities.pedestrian"
      title="Pedestrian access score"
    />
  </div>
  <Scorebox :score="scores.greening" title="Greening score" />
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['bicycle:mobility']"
      :priority="priorities.bicycle"
      title="Bicycle mobility score"
    />
    <Scorebox
      :score="scores['bicycle:access']"
      :priority="priorities.bicycle"
      title="Bicycle access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['transit:mobility']"
      :priority="priorities.transit"
      title="Transit mobility score"
    />
    <Scorebox
      :score="scores['transit:access']"
      :priority="priorities.transit"
      title="Transit access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['freight:mobility']"
      :priority="priorities.freight"
      title="Freight mobility score"
    />
    <Scorebox
      :score="scores['freight:access']"
      :priority="priorities.freight"
      title="Freight access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['traffic:mobility']"
      :priority="priorities.traffic"
      title="Traffic mobility score"
    />
    <Scorebox
      :score="scores['traffic:access']"
      :priority="priorities.traffic"
      title="Traffic access score"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Box, { BoxColor } from '@/elements/box/Box';
import { PrioritySet } from './typings';
import Scorebox from './Scorebox.vue';

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
  components: { Box, Scorebox },
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
        pedestrian: 'higher',
        bicycle: 'higher',
        transit: 'higher',
        freight: 'higher',
        traffic: 'higher',
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
  @apply bg-transparent border border-current;
}
</style>
