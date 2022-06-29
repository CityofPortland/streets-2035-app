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
    variant="light"
    class="text-center p-2 rounded-md"
    title="Safety score"
  />
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['pedestrian:mobility'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Pedestrian mobility score"
    />
    <Box
      :color="scoreColor(scores['pedestrian:access'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Pedestrian access score"
    />
  </div>
  <Box
    :color="scoreColor(scores.greening)"
    variant="light"
    class="text-center p-2 rounded-md"
    title="Greening score"
  />
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['bicycle:mobility'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Bicycle mobility score"
    />
    <Box
      :color="scoreColor(scores['bicycle:access'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Bicycle access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['transit:mobility'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Transit mobility score"
    />
    <Box
      :color="scoreColor(scores['transit:access'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Transit access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['freight:mobility'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Freight mobility score"
    />
    <Box
      :color="scoreColor(scores['freight:access'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Freight access score"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Box
      :color="scoreColor(scores['traffic:mobility'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Traffic mobility score"
    />
    <Box
      :color="scoreColor(scores['traffic:access'])"
      variant="light"
      class="text-center p-2 rounded-md"
      title="Traffic access score"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Box, { BoxColor } from '@/elements/box/Box';

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
