<template>
  <article class="flex flex-col gap-1 max-w-7xl px-4 mx-auto">
    <header class="prose">
      <h1 class="capitalize">
        {{ classificationLabel('design', designClassification) }} @
        {{ width }} feet - {{ subClassification }}
      </h1>
    </header>
    <section class="relative">
      <header class="prose">
        <h2>Balanced cross-section(s)</h2>
      </header>
      <img
        v-for="(image, index) in balancedImages"
        :key="index"
        v-show="index == balancedIndex"
        :src="`${publicPath}img/cross-section/${width}/${image}.png`"
      />
      <Pager
        v-if="balancedImages.length > 1"
        :list="balancedImages"
        :value="balancedIndex"
        @select="handleBalanced"
        class="max-w-md mx-auto"
      />
    </section>
    <section class="relative">
      <header class="prose">
        <h2>Periodic cross-section(s)</h2>
      </header>
      <img
        v-for="(image, index) in periodicImages"
        :key="index"
        v-show="index == periodicIndex"
        :src="`${publicPath}img/cross-section/${width}/${image}.png`"
      />
      <Pager
        v-if="periodicImages.length > 1"
        :list="periodicImages"
        :value="periodicIndex"
        @select="handlePeriodic"
        class="max-w-md mx-auto"
      />
    </section>
  </article>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import database from '@/composables/cross-section';

import { useStreetClassification } from '@/composables/use-street-classification';
import Pager from '@/components/pager/Pager.vue';

export default defineComponent({
  name: 'CrossSections',
  components: { Pager },
  props: {
    width: {
      type: Number,
      required: true,
    },
    designClassification: {
      type: String,
      required: true,
    },
    subClassification: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { classificationLabel } = useStreetClassification();
    const profiles =
      database[props.width][props.designClassification.toLowerCase()][
        props.subClassification.toLowerCase()
      ];

    const balancedIndex = ref(0);
    const periodicIndex = ref(0);

    return {
      publicPath: process.env.BASE_URL,
      balancedIndex,
      periodicIndex,
      profiles,
      balancedImages: computed(() => Object.keys(profiles)),
      periodicImages: computed(
        () => profiles[Object.keys(profiles)[balancedIndex.value]]
      ),
      classificationLabel,
      handleBalanced({ index }: { index: number }) {
        balancedIndex.value = index;
        periodicIndex.value = 0;
      },
      handlePeriodic({ index }: { index: number }) {
        periodicIndex.value = index;
      },
    };
  },
});
</script>
