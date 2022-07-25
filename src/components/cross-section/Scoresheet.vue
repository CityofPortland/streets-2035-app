<template>
  <section
    class="grid grid-flow-col gap-1 overflow-x-auto"
    :style="`
        grid-template-rows: repeat(8, auto);
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
    <Scorecard
      v-for="option in options"
      :key="option.name"
      :scores="option"
      :main-street="mainStreet"
      :priorities="priorities"
    >
      <slot :option="option"></slot>
    </Scorecard>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Scorecard from '@/components/cross-section/Scorecard.vue';
import { CrossSection } from '@/composables/cross-section';
import { PrioritySet } from './typings';

export default defineComponent({
  name: 'Scoresheet',
  components: { Scorecard },
  props: {
    options: { type: Array as () => Array<CrossSection>, required: true },
    mainStreet: {
      type: Boolean,
      default: false,
    },
    priorities: {
      type: Object as () => PrioritySet,
      default: () => ({
        pedestrian: 'high',
        bicycle: 'high',
        transit: 'high',
        freight: 'high',
        traffic: 'high',
      }),
    },
  },
});
</script>
