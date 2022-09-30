<script setup lang="ts">
import Box from '@/elements/box/Box';
import Dot from './Dot.vue';

defineProps({
  label: {
    type: String,
  },
  score: {
    type: Number,
  },
});
</script>

<template>
  <Box class="grid grid-cols-2 gap-2 items-center">
    <label v-if="label">{{ label }}</label>
    <Box class="flex gap-1 justify-self-end">
      <Dot v-for="n in score" :key="n" />
    </Box>
  </Box>
</template>
