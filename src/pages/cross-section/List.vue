<script setup lang="ts">
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { widths, useCrossSection } from '@/composables/cross-section';
import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import Select from '@/elements/inputs/Select.vue';
import Scoresheet from '@/components/cross-section/Scoresheet.vue';

const props = defineProps({
  width: { type: Number, required: true },
});

const { width } = toRefs(props);

const { options } = useCrossSection(width);

const publicPath = process.env.BASE_URL;

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

const handleWidth = (width: number) => changeRoute({ width });
</script>

<template>
  <article class="flex flex-col gap-1 max-w-7xl px-4 mx-auto">
    <header class="prose mb-8">
      <h1 class="capitalize">{{ width }} foot cross sections</h1>
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
    <Scoresheet :options="options">
      <template v-slot="{ option }">
        <Image
          :src="`${publicPath}img/cross-section/${width}/${option.continuousImage}.webp`"
          :sizes="[640]"
        />
        <Box
          color="gray"
          variant="light"
          class="p-2 flex justify-center rounded-md"
        >
          <router-link
            :to="{
              name: 'CrossSectionOption',
              params: { width, ordinal: option.ordinal },
            }"
            custom
            v-slot="{ href, navigate }"
          >
            <Anchor :url="href" @click="navigate">{{ option.name }}</Anchor>
          </router-link>
        </Box>
      </template>
    </Scoresheet>
  </article>
</template>
