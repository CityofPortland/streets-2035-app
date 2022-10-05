<script setup lang="ts">
import Box, { BoxColor } from '@/elements/box/Box';
import { Priority } from './typings';

const props = defineProps({
  score: {
    type: Number,
    required: true,
    validator(value: number) {
      // The value must match one of these strings
      return [1, 2, 3].includes(value);
    },
  },
  priority: {
    type: String as () => Priority,
  },
});

const scoreMap = new Map<number, BoxColor>([
  [1, 'red'],
  [2, 'tangerine'],
  [3, 'green'],
]);

const scoreColor = (score: number) =>
  props.priority == 'none' ? 'transparent' : scoreMap.get(score);
</script>

<template>
  <Box
    :color="scoreColor(score)"
    variant="neutral"
    class="text-center p-2 border border-current rounded-md"
    :class="{
      'low-priority': priority == 'lower',
    }"
  />
</template>

<style scoped>
.low-priority {
  background-image: radial-gradient(
    circle at center,
    black 0%,
    transparent 50%
  );
  background-size: 4px 4px;
}
</style>
