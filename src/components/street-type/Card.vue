<script setup lang="ts">
import Box from '@/elements/box/Box';
import Score from './Score.vue';

defineProps({
  percentage: { type: Number, required: true },
  scores: { type: Array as () => Array<number>, required: true },
});
</script>

<template>
  <Box
    variant="light"
    class="p-4 flex flex-col gap-4"
    style="box-shadow: 10px 10px currentColor"
  >
    <Box as="header" class="not-prose grid grid-cols-1 gap-4">
      <slot></slot>
    </Box>

    <section class="mt-auto not-prose flex flex-col gap-2">
      <h3 class="text-lg">Percentage of all city streets</h3>
      <div class="flex flex-wrap items-center gap-2">
        <Box
          as="span"
          class="bg-current h-4"
          :style="{ width: `${percentage * 100}%` }"
        />
        <p>{{ percentage * 100 }}%</p>
        <p>(~{{ Math.floor(2090 * percentage) }} miles)</p>
      </div>
    </section>

    <section class="not-prose flex flex-col gap-2">
      <h3 class="text-lg">Typical conditions</h3>
      <ul class="grid grid-cols-1 gap-2 not-prose">
        <Score as="li" label="Land Use Intensity" :score="scores[0]" />
        <Score as="li" label="Roadway Width" :score="scores[1]" />
        <Score as="li" label="Multimodal Mobility Demand" :score="scores[2]" />
        <Score as="li" label="Loading/Business Access" :score="scores[3]" />
      </ul>
    </section>
  </Box>
</template>
