<script setup lang="ts">
import Box from '@/elements/box/Box';
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
  },
  score: {
    type: Number,
  },
});

const extra = computed(() => Math.abs((props.score || 0) - 3));
</script>

<template>
  <Box class="flex justify-start gap-2 items-center">
    <label class="basis-full md:basis-1/2" v-if="label">{{ label }}</label>
    <Box class="flex gap-1">
      <span
        v-for="n in score"
        :key="n"
        class="bg-current h-4 w-4 rounded-full"
      />
      <span
        v-for="n in extra"
        :key="n"
        class="bg-current h-4 w-4 rounded-full opacity-25"
      />
    </Box>
  </Box>
</template>
