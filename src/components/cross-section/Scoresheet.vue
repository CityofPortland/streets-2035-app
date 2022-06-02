<template>
  <div
    class="grid grid-flow-col gap-1"
    style="grid-template-rows: repeat(6, auto)"
  >
    <span class="py-4"></span>
    <span class="py-4">Safety</span>
    <span class="py-4">Pedestrian</span>
    <span class="py-4">Greening</span>
    <span class="py-4">Bicycle</span>
    <span class="py-4">Transit</span>
    <Scorecard
      v-for="score in scores"
      :key="score.name"
      :name="score.name"
      :scores="score"
      class="row-span-6"
    >
      <img
        src="https://pbotapps-test.portland.gov/streets-2035/img/cross-section/50/PortlandStreets_CrossSections_50C_2Lane_Midbock1@2048.webp"
      />
    </Scorecard>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';

import Box from '@/elements/box/Box';
import Scorecard from '@/components/cross-section/Scorecard.vue';

export default defineComponent({
  name: 'Scoresheet',
  components: { Box, Scorecard },
  props: {
    scores: { type: Array, required: true },
  },
  setup(props) {
    return {
      layoutClasses: computed(() => [`grid-cols-${props.scores.length + 1}`]),
    };
  },
});
</script>
