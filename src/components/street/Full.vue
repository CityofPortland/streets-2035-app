<template>
  <article>
    <header>
      <h1 class="mb-3 text-2xl lg:text-3xl font-bold">
        {{ street.name?.trim() || 'Unnamed segment' }}
      </h1>
      <p
        class="my-2 text-xl lg:text-2xl text-gray-700 font-bold"
        v-if="street.block"
      >
        {{ street.block }} block
      </p>
    </header>
    <main>
      <div class="my-2">
        <h2 class="text-gray-700 font-semibold">Transportation plan ID</h2>
        <span>{{ street.id }}</span>
      </div>

      <div class="grid grid-cols-1 gap-2">
        <div v-if="street.width">
          <h2 class="text-gray-700 font-semibold">Road width</h2>
          <span>{{ street.width }} feet</span>
        </div>

        <div v-if="crossSectionRoute">
          <router-link :to="crossSectionRoute"
            ><Button size="small">View cross sections</Button></router-link
          >
        </div>
      </div>

      <div
        v-for="(classification, index) in classificationKeys"
        :key="index"
        class="my-2"
      >
        <h2 class="text-gray-700 font-semibold">
          {{ classification.charAt(0).toUpperCase() + classification.slice(1) }}
          classification
        </h2>
        <Anchor
          :url="`https://portland-tsp.com/#/text#${classificationLabel(
            classification,
            street.classifications[classification]
          )
            .toLowerCase()
            .split(' ')
            .join('-')}`"
        >
          {{
            classificationLabel(
              classification,
              street.classifications[classification]
            )
          }}
        </Anchor>
      </div>
    </main>
  </article>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';

import Anchor from '@/elements/anchor/Anchor.vue';
import Button from '@/elements/button/Button.vue';

import { Street } from './street';
import { useStreetClassification } from '@/composables/use-street-classification';
import { useCrossSection } from '@/composables/cross-section';

export default defineComponent({
  name: 'Street',
  components: {
    Anchor,
    Button,
  },
  props: {
    street: {
      type: Object as () => Street,
      required: true,
    },
  },
  setup(props) {
    const { street } = toRefs(props);
    const { crossSectionRoute } = useCrossSection(ref(street.value.width));
    const { classificationKeys, classificationLabel } =
      useStreetClassification(street);
    return {
      classificationLabel,
      classificationKeys,
      crossSectionRoute,
    };
  },
});
</script>
