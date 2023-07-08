<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import {
  LocationAsRelativeRaw,
  RouteLocationOptions,
  RouteQueryAndHash,
  useRoute,
  useRouter,
} from 'vue-router';

import Anchor from '@/elements/anchor/Anchor.vue';
import Image from '@/elements/img/Image.vue';
import Portion from './Portion.vue';
import Select from '@/elements/inputs/Select.vue';
import Toggle from '@/elements/inputs/Toggle.vue';
import { useClassificationStore } from '@/store/classification';
import { useSidewalk } from '@/composables/sidewalk-tradeoff';
import Box from '@/elements/box/Box';

const props = defineProps({
  width: { type: Number, required: true },
  pedestrianDistrict: { type: Boolean, default: false },
  streetType: { type: String as () => 'CIMS', default: 'CIMS' },
});

const { pedestrianDistrict, streetType } = toRefs(props);

const route = useRoute();
const router = useRouter();
const store = useClassificationStore();
const { sidewalk } = useSidewalk(streetType, pedestrianDistrict);

const frontage = ref(0);
const pedestrian = ref(0);
const furnishings = ref(0);

const publicPath = process.env.BASE_URL;

// watchEffect(() => {
frontage.value = sidewalk.value?.frontage.standardWidth || 0;
pedestrian.value = sidewalk.value?.pedestrians.standardWidth || 0;
furnishings.value = sidewalk.value?.furnishings.standardWidth || 0;
// });

const streetTypes = computed(() =>
  store.models
    .filter((m) => m.group == 'design')
    .filter((m) => m.value != 'UT')
    .sort((a, b) => (b.label > a.label ? -1 : 1))
);

const standardWidth = computed(
  () =>
    (sidewalk.value?.frontage.standardWidth || 0) +
    (sidewalk.value?.pedestrians.standardWidth || 0) +
    (sidewalk.value?.furnishings.standardWidth || 0) +
    (sidewalk.value?.curb.standardWidth || 0)
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
  <article class="flex flex-col gap-4 pb-12">
    <Box as="header" class="flex flex-col gap-4">
      <Box as="main" class="prose prose-lg px-4">
        <h1 class="capitalize text-current">Sidewalk tradeoffs evaluation</h1>
        <p>
          The Sidewalk Tradeoffs Evaluation Tool can be used to visualize the
          tradeoffs when constructing or maintaining a less than standard
          sidewalk with private development or a city project. It can also be
          used to determine whether additional priority needs to be placed on
          finding opportunities for greening (i.e., street trees and stormwater
          swales).
        </p>
        <p>
          To use the tool, select the street type that the project is on and
          whether it is in a pedestrian district. This will populate the City's
          standards for the furnishing, pedestrian, and frontage zones of the
          sidewalk. You can then enter the proposed widths for each sidewalk
          zone to see the tradeoffs of non-standard sidewalk widths.
        </p>
        <p>
          This tool is a representation of information provided in the city's
          <Anchor
            url="//www.portland.gov/sites/default/files/2022/PBOT Pedestrian Design Guide 2022.pdf"
            >Pedestrian Design Guide.</Anchor
          >
        </p>
      </Box>
      <figure class="prose prose-lg px-4 max-w-none">
        <Image :src="`${publicPath}img/sidewalk-tradeoffs/zones.webp`" />
        <figcaption class="text-current">
          Rendering to demonstrate the different parts of the sidewalk. You may
          use the tool controls below to see the tradeoffs for space when
          designing sidewalks.
        </figcaption>
      </figure>
    </Box>

    <main class="flex flex-col md:flex-row gap-2 px-4">
      <section class="flex-1 grid md:grid-rows-[11rem_1fr]">
        <div>
          <div class="flex flex-col">
            <label class="font-semibold">Street type</label>
            <Select
              id="type"
              name="type"
              class="w-full"
              @update:modelValue="changeQuery({ streetType: $event })"
            >
              <option
                v-for="(x, i) in streetTypes"
                :key="i"
                :value="x.value"
                :selected="x.value == streetType"
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
        </div>
        <dl>
          <div>
            <dt class="font-semibold">Standard width</dt>
            <dd class="grid grid-cols-2 gap-2">
              {{ standardWidth }}
              feet
            </dd>
          </div>
          <div>
            <dt class="font-semibold">Alternative width</dt>
            <dd>{{ totalWidth.toFixed(1) }} feet</dd>
          </div>
        </dl>
      </section>
      <Portion
        v-if="sidewalk?.frontage"
        label="Frontage Zone"
        :maxWidth="2.5"
        :portion="sidewalk.frontage"
        @changed="frontage = $event"
        class="flex-1 grid md:grid-rows-[minmax(min-content,_11rem)_1fr]"
      />
      <Portion
        v-if="sidewalk?.pedestrians"
        label="Pedestrian Through Zone (PTZ)"
        :maxWidth="8"
        :portion="sidewalk.pedestrians"
        @changed="pedestrian = $event"
        class="flex-1 grid md:grid-rows-[minmax(min-content,_11rem)_1fr]"
      />
      <Portion
        v-if="sidewalk?.furnishings"
        label="Furnishing Zone"
        :maxWidth="6"
        :portion="sidewalk.furnishings"
        @changed="furnishings = $event"
        class="flex-1 grid md:grid-rows-[minmax(min-content,_11rem)_1fr]"
      />
      <div class="flex-1 grid md:grid-rows-[minmax(min-content,_11rem)_1fr]">
        <h3 class="font-bold">Curb</h3>
        <dl>
          <div>
            <dt class="font-semibold">Standard width</dt>
            <dd class="grid grid-cols-2 gap-2">0.5 feet</dd>
          </div>
        </dl>
      </div>
    </main>
  </article>
</template>
