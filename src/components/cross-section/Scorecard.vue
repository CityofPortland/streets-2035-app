<template>
  <header class="w-32 md:w-full">
    <slot></slot>
    <Box
      as="h3"
      color="gray"
      variant="light"
      class="text-center rounded-md p-4"
      >{{ name }}</Box
    >
  </header>
  <Box
    :color="scoreColor(scores.safety)"
    variant="light"
    class="text-center p-4 rounded-md"
    title="Safety score"
    >{{ scores.safety }}</Box
  >
  <div class="grid grid-cols-2">
    <Box
      :color="scoreColor(scores['pedestrian:mobility'])"
      variant="light"
      class="text-center p-4 rounded-l-md"
      title="Pedestrian mobility score"
      >{{ scores['pedestrian:mobility'] }}</Box
    >
    <Box
      :color="scoreColor(scores['pedestrian:access'])"
      variant="light"
      class="text-center p-4 rounded-r-md"
      title="Pedestrian access score"
      >{{ scores['pedestrian:access'] }}</Box
    >
  </div>
  <Box
    :color="scoreColor(scores.greening)"
    variant="light"
    class="text-center p-4 rounded-md"
    title="Greening score"
    >{{ scores.greening }}</Box
  >
  <div class="grid grid-cols-2">
    <Box
      :color="scoreColor(scores['bicycle:mobility'])"
      variant="light"
      class="text-center p-4 rounded-l-md"
      title="Bicycle mobility score"
      >{{ scores['bicycle:mobility'] }}</Box
    >
    <Box
      :color="scoreColor(scores['bicycle:access'])"
      variant="light"
      class="text-center p-4 rounded-r-md"
      title="Bicycle access score"
      >{{ scores['bicycle:access'] }}</Box
    >
  </div>
  <div class="grid grid-cols-2">
    <Box
      :color="scoreColor(scores['transit:mobility'])"
      variant="light"
      class="text-center p-4 rounded-l-md"
      title="Transit mobility score"
      >{{ scores['transit:mobility'] }}</Box
    >
    <Box
      :color="scoreColor(scores['transit:access'])"
      variant="light"
      class="text-center p-4 rounded-r-md"
      title="Transit access score"
      >{{ scores['transit:access'] }}</Box
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Box from '@/elements/box/Box';

type ScoreSet = {
  safety: number;
  'pedestrian:mobility': number;
  'pedestrian:access': number;
  greening: number;
  'bicycle:mobility': number;
  'bicycle:access': number;
  'transit:mobility': number;
  'transit:access': number;
};

export default defineComponent({
  name: 'Scorecard',
  components: { Box },
  props: {
    name: String,
    image: String,
    scores: {
      type: Object as () => ScoreSet,
      required: true,
    },
  },
  setup() {
    const scoreMap = new Map<number, string>([
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
