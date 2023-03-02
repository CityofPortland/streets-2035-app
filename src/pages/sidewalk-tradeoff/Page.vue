<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue';
import {
  LocationAsRelativeRaw,
  RouteLocationOptions,
  RouteQueryAndHash,
  useRoute,
  useRouter,
} from 'vue-router';

import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import Portion from './Portion.vue';
import Select from '@/elements/inputs/Select.vue';
import Toggle from '@/elements/inputs/Toggle.vue';
import { useClassificationStore } from '@/store/classification';
import { useSidewalk } from '@/composables/sidewalk-tradeoff';

const props = defineProps({
  width: { type: Number, required: true },
  pedestrianDistrict: { type: Boolean, default: false },
  streetType: { type: String as () => 'CIMS', default: 'CIMS' },
});

const { pedestrianDistrict, streetType } = toRefs(props);

const route = useRoute();
const router = useRouter();
const store = useClassificationStore();
const sidewalk = useSidewalk(streetType, pedestrianDistrict);

const frontage = ref(0);
const pedestrian = ref(0);
const furnishings = ref(0);

const publicPath = process.env.BASE_URL;

watchEffect(() => {
  frontage.value = sidewalk.value?.frontage.standardWidth || 0;
  pedestrian.value = sidewalk.value?.pedestrians.standardWidth || 0;
  furnishings.value = sidewalk.value?.furnishings.standardWidth || 0;
});

const streetTypes = computed(() =>
  store.models
    .filter((m) => m.group == 'design')
    .sort((a, b) => (b.label > a.label ? -1 : 1))
);

const totalWidth = computed(
  () =>
    frontage.value +
    pedestrian.value +
    furnishings.value +
    (sidewalk.value?.curb.standardWidth || 0)
);

const changeQuery = (query: Record<string, string>) => {
  changeRoute({
    query: {
      ...route.query,
      ...query,
    },
  });
};

const changeRoute = (
  to: RouteQueryAndHash & LocationAsRelativeRaw & RouteLocationOptions
) => {
  router.replace({
    name: route.name || 'SidewalkTradeoffs',
    query: {
      ...route.query,
      ...to.query,
    },
  });
};
</script>
<template>
  <article class="flex flex-col gap-4 max-w-7xl p-4 mx-auto">
    <header class="prose prose-lg mb-8">
      <h1 class="capitalize">Sidewalk tradeoffs evaluation</h1>
      <p>
        The Sidewalk Tradeoffs Evaluation Tool can be used to visualize the
        tradeoffs when constructing or maintaining a less than standard sidewalk
        with private development or a capital project. It can also be used to
        determine whether additional priority needs to be placed on finding
        opportunities for greening (i.e., street trees and stormwater swales).
      </p>
      <p>
        To use the tool, select the street type that the project is on and
        whether it is in a pedestrian district. This will populate the City's
        standards for the furnishing, pedestrian, and frontage zones of the
        sidewalk. You can then enter the proposed widths for each sidewalk zone
        to see the tradeoffs of non-standard sidewalk widths.
      </p>
      <Box as="section" class="flex gap-2">
        <div class="flex flex-col">
          <label class="font-semibold">Street type</label>
          <Select
            id="type"
            name="type"
            @update:modelValue="changeQuery({ streetType: $event })"
          >
            <option
              v-for="(x, i) in streetTypes"
              :key="i"
              :value="x.value"
              :selected="x == streetType"
            >
              {{ x.label }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Pedestrian district</label>
          <Toggle
            id="pedestrianDistrict"
            label="Pedestrian district"
            true-label="yes"
            false-label="no"
            :modelValue="pedestrianDistrict"
            @update:modelValue="
              changeQuery({ pedestrianDistrict: String($event) })
            "
          >
            <label class="hidden">Pedestrian district</label>
          </Toggle>
        </div>
      </Box>
    </header>
    <figure>
      <Image :src="`${publicPath}img/sidewalk-tradeoffs/zones.webp`" />
      <figcaption>
        Rendering to demonstrate the different parts of the sidewalk. You may
        use the tool controls below to see the tradeoffs for space when
        designing sidewalks.
      </figcaption>
    </figure>
    <main class="grid grid-cols-1 lg:grid-cols-4 gap-2">
      <Portion
        label="Frontage zone"
        :maxWidth="2.5"
        :portion="sidewalk.frontage"
        @changed="frontage = $event"
      />
      <Portion
        label="Pedestrian Through Zone (PTZ)"
        :maxWidth="8"
        :portion="sidewalk.pedestrians"
        @changed="pedestrian = $event"
      />
      <Portion
        label="Furnishing Zone"
        :maxWidth="6"
        :portion="sidewalk.furnishings"
        @changed="furnishings = $event"
      />
      <section class="bg-transparent flex flex-col gap-1">
        <h3 class="font-bold">Curb Zone</h3>
        <dl>
          <div>
            <dt class="font-semibold">Standard width</dt>
            <dd class="grid grid-cols-2 gap-2">
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.1"
                value="0.5"
                disabled
              />
              <input
                type="number"
                disabled
                value="0.5"
                class="border border-gray-500 opacity-50 rounded-md shadow-md bg-gray-100 text-current placeholder-gray-500 truncate focus:outline-none focus:ring focus:ring-blue-500"
              />
            </dd>
          </div>
        </dl>
        <h3 class="font-bold">Total width</h3>
        <dl>
          <div>
            <dt class="font-semibold">Standard width</dt>
            <dd class="grid grid-cols-2 gap-2">
              <input
                type="range"
                min="0"
                max="17"
                step="0.1"
                :value="
                  sidewalk.frontage.standardWidth +
                  sidewalk.pedestrians.standardWidth +
                  sidewalk.furnishings.standardWidth +
                  sidewalk.curb.standardWidth
                "
                disabled
              />
              <input
                type="number"
                disabled
                :value="
                  sidewalk.frontage.standardWidth +
                  sidewalk.pedestrians.standardWidth +
                  sidewalk.furnishings.standardWidth +
                  sidewalk.curb.standardWidth
                "
                class="border border-gray-500 opacity-50 rounded-md shadow-md bg-gray-100 text-current placeholder-gray-500 truncate focus:outline-none focus:ring focus:ring-blue-500"
              />
            </dd>
          </div>
          <div>
            <dt class="font-semibold">Alternative width</dt>
            <dd class="grid grid-cols-2 gap-2">
              <input
                type="range"
                min="0"
                max="17"
                step="0.1"
                :value="totalWidth"
                disabled
              />
              <input
                type="number"
                disabled
                :value="totalWidth"
                class="border border-gray-500 opacity-50 rounded-md shadow-md bg-gray-100 text-current placeholder-gray-500 truncate focus:outline-none focus:ring focus:ring-blue-500"
              />
            </dd>
          </div>
        </dl>
      </section>
    </main>
  </article>
</template>
