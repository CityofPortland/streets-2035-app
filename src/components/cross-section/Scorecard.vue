<template>
  <Box
    as="header"
    class="flex flex-col gap-1 transition-opacity"
    :class="{ 'opacity-25': disabled }"
  >
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
  <Scorebox
    :score="scores.safety"
    title="Safety score"
    class="transition-opacity"
    :class="{ 'opacity-25': disabled }"
  />
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['pedestrian:mobility']"
      :priority="priorities.pedestrian"
      title="Pedestrian mobility score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
    <Scorebox
      :score="scores['pedestrian:access']"
      :priority="priorities.pedestrian"
      title="Pedestrian access score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
  </div>
  <Scorebox
    :score="scores.greening"
    title="Greening score"
    class="transition-opacity"
    :class="{ 'opacity-25': disabled }"
  />
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['bicycle:mobility']"
      :priority="priorities.bicycle"
      title="Bicycle mobility score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
    <Scorebox
      :score="scores['bicycle:access']"
      :priority="priorities.bicycle"
      title="Bicycle access score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['transit:mobility']"
      :priority="priorities.transit"
      title="Transit mobility score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
    <Scorebox
      :score="scores['transit:access']"
      :priority="
        !mainStreet
          ? priorities.transit
          : priorities.transit == 'none'
          ? 'none'
          : 'higher'
      "
      title="Transit access score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['freight:mobility']"
      :priority="priorities.freight"
      title="Freight mobility score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
    <Scorebox
      :score="scores['freight:access']"
      :priority="
        !mainStreet
          ? priorities.freight
          : priorities.freight == 'none'
          ? 'none'
          : 'higher'
      "
      title="Freight access score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['traffic:mobility']"
      :priority="priorities.traffic"
      title="Traffic mobility score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
    <Scorebox
      :score="scores['traffic:access']"
      :priority="
        !mainStreet
          ? priorities.traffic
          : priorities.traffic == 'none'
          ? 'none'
          : 'higher'
      "
      title="Traffic access score"
      class="transition-opacity"
      :class="{ 'opacity-25': disabled }"
    />
  </div>
  <Button
    size="small"
    :label="disabled ? 'Enable' : 'Disable'"
    @click="disabled = !disabled"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import Box, { BoxColor } from '@/elements/box/Box';
import Button from '@/elements/button/Button.vue';
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
  components: { Box, Button, Scorebox },
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

    const disabled = ref(false);

    return {
      disabled,
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
