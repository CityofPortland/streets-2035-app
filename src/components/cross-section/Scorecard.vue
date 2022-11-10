<script setup lang="ts">
import { computed, ref } from 'vue';

import Button from '@/elements/button/Button.vue';
import Box from '@/elements/box/Box';
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

defineProps({
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
});

const emit = defineEmits(['move-left', 'move-right']);

const disabled = ref(false);

const classes = computed(() => {
  return {
    'transition-opacity': true,
    'opacity-25': disabled.value,
  };
});
</script>

<template>
  <Box
    as="header"
    class="flex flex-col gap-1 transition-opacity"
    :class="classes"
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
  <Scorebox :score="scores.safety" title="Safety score" :class="classes" />
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['pedestrian:mobility']"
      :priority="priorities.pedestrian"
      title="Pedestrian mobility score"
      :class="classes"
    />
    <Scorebox
      :score="scores['pedestrian:access']"
      :priority="priorities.pedestrian"
      title="Pedestrian access score"
      :class="classes"
    />
  </div>
  <Scorebox :score="scores.greening" title="Greening score" :class="classes" />
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['bicycle:mobility']"
      :priority="priorities.bicycle"
      title="Bicycle mobility score"
      :class="classes"
    />
    <Scorebox
      :score="scores['bicycle:access']"
      :priority="priorities.bicycle"
      title="Bicycle access score"
      :class="classes"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['transit:mobility']"
      :priority="priorities.transit"
      title="Transit mobility score"
      :class="classes"
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
      :class="classes"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['freight:mobility']"
      :priority="priorities.freight"
      title="Freight mobility score"
      :class="classes"
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
      :class="classes"
    />
  </div>
  <div class="grid grid-cols-2 gap-1">
    <Scorebox
      :score="scores['traffic:mobility']"
      :priority="priorities.traffic"
      title="Traffic mobility score"
      :class="classes"
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
      :class="classes"
    />
  </div>
  <div class="grid grid-cols-1 gap-1">
    <Button
      size="small"
      :label="disabled ? 'Enable' : 'Disable'"
      @click="disabled = !disabled"
    />
    <div class="grid grid-cols-2 gap-1">
      <Button
        size="small"
        label="Move left"
        @click="emit('move-left')"
      /><Button size="small" label="Move right" @click="emit('move-right')" />
    </div>
  </div>
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
.no-priority {
  @apply bg-transparent border border-current;
}
</style>
