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
          <h2 class="text-gray-700 font-semibold">Roadway width</h2>
          <span>{{ street.width }} feet</span>
        </div>

        <div v-if="crossSectionRoute">
          <router-link :to="crossSectionRoute" custom v-slot="{ navigate }">
            <Button
              label="View cross-sections"
              size="small"
              @click="navigate"
              class="inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
                aria-label="Image"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>View cross-sections</span>
            </Button>
          </router-link>
        </div>
        <div v-else>
          <Box
            color="gray"
            variant="light"
            class="text-sm px-2 py-1 inline-flex items-center gap-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
              aria-label="No symbol"
            >
              <path
                fill-rule="evenodd"
                d="M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z"
                clip-rule="evenodd"
              />
            </svg>

            <span>No cross-sections available</span>
          </Box>
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
import { defineComponent, toRefs } from 'vue';

import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Button from '@/elements/button/Button.vue';

import { Street } from '@/composables/use-street';
import { useStreetClassification } from '@/composables/use-street-classification';
import { useCrossSection } from '@/composables/cross-section';

export default defineComponent({
  name: 'Street',
  components: {
    Anchor,
    Box,
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
    const { crossSectionRoute } = useCrossSection(street);
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
