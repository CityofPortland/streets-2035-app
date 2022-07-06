<template>
  <article class="flex flex-col gap-1 max-w-7xl px-4 mx-auto">
    <header class="prose mb-8">
      <h1 class="capitalize">Cross sections</h1>
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
      </Box>
    </section>
    <router-view></router-view>
  </article>
</template>
<script lang="ts">
import { widths } from '@/composables/cross-section';
import { useStreetClassification } from '@/composables/use-street-classification';
import Box from '@/elements/box/Box';
import Select from '@/elements/inputs/Select.vue';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'CrossSections',
  components: { Box, Select },
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const { classificationLabel } = useStreetClassification();

    const route = useRoute();
    const router = useRouter();

    const changeRoute = (
      params: Partial<{
        width: number;
      }>
    ) => {
      router.push({
        name: route.name || 'CrossSectionList',
        params: {
          ...route.params,
          ...params,
        },
      });
    };

    return {
      widths,
      classificationLabel,
      handleWidth(width: number) {
        changeRoute({ width });
      },
    };
  },
});
</script>
