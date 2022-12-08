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
    class="m-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-prose"
  >
    <Box as="header" class="not-prose grid grid-cols-1 gap-4">
      <slot name="header"></slot>
    </Box>
    <main class="flex flex-col gap-4">
      <slot></slot>
      <section class="not-prose flex flex-col gap-2">
        <p class="text-lg">{{ percentage * 100 }}% of all city streets</p>
      </section>

      <section class="not-prose flex flex-col gap-2">
        <ul class="grid grid-cols-1 gap-2 not-prose">
          <Score as="li" label="Land Use Intensity" :score="scores[0]" />
          <Score as="li" label="Roadway Width" :score="scores[1]" />
          <Score
            as="li"
            label="Multimodal Mobility Demand"
            :score="scores[2]"
          />
          <Score as="li" label="Loading/Business Access" :score="scores[3]" />
        </ul>
      </section>
    </main>
  </Box>
</template>
