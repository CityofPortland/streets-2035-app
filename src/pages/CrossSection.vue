<template>
  <article class="flex flex-col gap-1 max-w-7xl px-4 mx-auto">
    <header class="prose max-w-none">
      <h1 class="capitalize">
        {{ title }}
      </h1>
    </header>
    <section>
      <Box as="form" class="flex flex-col md:flex-row flex-wrap md:space-x-3">
        <div class="flex flex-col">
          <label class="font-semibold">Width</label>
          <Select
            id="width"
            name="width"
            :modelValue="width.toString()"
            @update:modelValue="handleWidth"
          >
            <option
              v-for="(w, index) in widths"
              :key="index"
              :value="w"
              :selected="w == width"
            >
              {{ w }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Design classification</label>
          <Select
            id="design"
            name="design"
            :modelValue="designClassification"
            @update:modelValue="handleDesignClass"
          >
            <option
              v-for="(d, index) in designClasses"
              :key="index"
              :value="d.value"
              :selected="d.value.toLowerCase() == designClassification"
            >
              {{ d.label }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Priority</label>
          <Select
            id="priority"
            name="priority"
            :modelValue="subClassification"
            @update:modelValue="handlePriority"
          >
            <option
              v-for="(p, index) in priorities"
              :key="index"
              :value="p"
              :selected="p.toLowerCase() == subClassification"
            >
              {{ p }}
            </option>
          </Select>
        </div>
      </Box>
    </section>
    <section class="relative">
      <header class="prose">
        <h2>Balanced cross-section(s)</h2>
      </header>
      <Image
        v-for="(image, index) in balancedImages"
        :key="index"
        v-show="index == balancedIndex"
        :src="`${publicPath}img/cross-section/${width}/${image}.webp`"
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
      <Image
        v-for="(image, index) in periodicImages"
        :key="index"
        v-show="index == periodicIndex"
        :src="`${publicPath}img/cross-section/${width}/${image}.webp`"
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
import { computed, defineComponent, ref, toRefs } from 'vue';
import database from '@/composables/cross-section';

import { useStreetClassification } from '@/composables/use-street-classification';
import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import Pager from '@/components/pager/Pager.vue';
import Select from '@/elements/inputs/Select.vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'CrossSections',
  components: { Box, Image, Pager, Select },
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
    const { models, classificationLabel } = useStreetClassification();
    const { width, designClassification, subClassification } = toRefs(props);

    const profiles = computed(
      () =>
        database[width.value][designClassification.value.toLowerCase()][
          subClassification.value.toLowerCase()
        ]
    );
    const balancedIndex = ref(0);
    const periodicIndex = ref(0);

    const route = useRoute();
    const router = useRouter();

    const changeRoute = (
      params: Partial<{
        width: number;
        designClassification: string;
        subClassification: string;
      }>
    ) => {
      router.push({
        name: 'CrossSection',
        params: {
          ...route.params,
          ...params,
        },
      });
    };

    onBeforeRouteUpdate(() => {
      balancedIndex.value = 0;
      periodicIndex.value = 0;
    });

    return {
      publicPath: process.env.BASE_URL,
      title: computed(
        () =>
          `${classificationLabel('design', designClassification.value)} @ ${
            width.value
          } feet - ${subClassification.value}`
      ),
      balancedIndex,
      periodicIndex,
      widths: Object.keys(database),
      balancedImages: computed(() => Object.keys(profiles.value)),
      periodicImages: computed(
        () => profiles.value[Object.keys(profiles.value)[balancedIndex.value]]
      ),
      designClasses: computed(() =>
        models
          .filter((m) => m.group == 'design')
          .filter((m) =>
            Object.keys(database[width.value]).find(
              (c) =>
                c.localeCompare(m.value, undefined, {
                  sensitivity: 'base',
                }) === 0
            )
          )
          .map((m) => ({ value: m.value, label: m.label }))
      ),
      priorities: computed(() =>
        Object.keys(database[width.value][designClassification.value]).map(
          (p) => {
            return p.slice(0, 1).toLocaleUpperCase() + p.slice(1);
          }
        )
      ),
      classificationLabel,
      handleBalanced({ index }: { index: number }) {
        balancedIndex.value = index;
        periodicIndex.value = 0;
      },
      handlePeriodic({ index }: { index: number }) {
        periodicIndex.value = index;
      },
      handleWidth(width: number) {
        changeRoute({ width });
      },
      handleDesignClass(design: string) {
        changeRoute({ designClassification: design.toLowerCase() });
      },
      handlePriority(priority: string) {
        changeRoute({ subClassification: priority.toLowerCase() });
      },
    };
  },
});
</script>
