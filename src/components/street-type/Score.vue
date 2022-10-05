<script setup lang="ts">
import Box from '@/elements/box/Box';

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
  <Box class="flex justify-between gap-2 items-center">
    <label v-if="label">{{ label }}</label>
    <Box class="flex gap-1">
      <span
        v-for="n in score"
        :key="n"
        class="bg-current h-4 w-4 rounded-full"
      />
    </Box>
  </Box>
</template>
