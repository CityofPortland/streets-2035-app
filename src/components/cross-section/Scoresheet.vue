<script setup lang="ts">
import Scorecard from '@/components/cross-section/Scorecard.vue';
import { CrossSection } from '@/composables/cross-section';
import { ref, watch } from 'vue';
import { PrioritySet } from './typings';

const props = defineProps({
  options: { type: Array as () => Array<CrossSection>, required: true },
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

// Get a ref copy of the options to manipulate
const options = ref([...props.options]);

// If we get a new set of options, replace the ref
watch(
  () => props.options,
  (value) => {
    options.value = value;
  }
);

const handleMove = (curr: number, desired: number) => {
  console.log(`Moving from ${curr} to ${desired}...`);
  if (desired >= 0 && desired < options.value.length) {
    options.value.splice(desired, 0, ...options.value.splice(curr, 1));
  }
};
</script>

<template>
  <section
    class="grid grid-flow-col gap-1 overflow-x-auto"
    :style="`
        grid-template-rows: repeat(9, auto);
        grid-template-columns: minmax(min-content, 14rem) repeat(${options.length}, minmax(10rem, 14rem) [col-start]);
      `"
  >
    <span class="py-2"></span>
    <span class="py-2">Safety</span>
    <span class="py-2">Pedestrian</span>
    <span class="py-2">Greening</span>
    <span class="py-2">Bicycle</span>
    <span class="py-2">Transit</span>
    <span class="py-2">Freight</span>
    <span class="py-2">Traffic</span>
    <span></span>
    <Scorecard
      v-for="(option, index) in options"
      :key="`${option.width}:${option.name}`"
      :scores="option"
      :main-street="mainStreet"
      :priorities="priorities"
      @move-left="handleMove(index, index - 1)"
      @move-right="handleMove(index, index + 1)"
    >
      <slot :option="option"></slot>
    </Scorecard>
  </section>
</template>
