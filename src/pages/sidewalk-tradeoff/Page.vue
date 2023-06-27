<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue';
import {
  LocationAsRelativeRaw,
  RouteLocationOptions,
  RouteQueryAndHash,
  useRoute,
  useRouter,
} from 'vue-router';

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
const { sidewalk } = useSidewalk(streetType, pedestrianDistrict);

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
  <article class="flex flex-col gap-4 p-4 mx-auto">
    <header class="prose prose-lg max-w-none mb-8 grid grid-cols-2">
      <section>
        <h1 class="capitalize">Sidewalk tradeoffs evaluation</h1>
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
      </section>
      <figure>
        <Image :src="`${publicPath}img/sidewalk-tradeoffs/zones.webp`" />
        <figcaption>
          Rendering to demonstrate the different parts of the sidewalk. You may
          use the tool controls below to see the tradeoffs for space when
          designing sidewalks.
        </figcaption>
      </figure>
    </header>

    <main class="grid grid-cols-1 lg:grid-cols-4 gap-2">
      <section class="bg-transparent flex flex-col gap-1">
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
        <h3 class="font-bold">Curb</h3>
        <dl>
          <div>
            <dt class="font-semibold">Standard width</dt>
            <dd class="grid grid-cols-2 gap-2">0.5 feet</dd>
          </div>
        </dl>
        <h3 class="font-bold">Total width</h3>
        <dl>
          <div>
            <dt class="font-semibold">Standard width</dt>
            <dd class="grid grid-cols-2 gap-2">
              {{
                sidewalk.frontage.standardWidth +
                sidewalk.pedestrians.standardWidth +
                sidewalk.furnishings.standardWidth +
                sidewalk.curb.standardWidth
              }}
              feet
            </dd>
          </div>
          <div>
            <dt class="font-semibold">Alternative width</dt>
            <dd>{{ totalWidth }} feet</dd>
          </div>
        </dl>
      </section>
      <Portion
        v-if="sidewalk?.frontage"
        label="Frontage zone"
        :maxWidth="2.5"
        :portion="sidewalk.frontage"
        @changed="frontage = $event"
      />
      <Portion
        v-if="sidewalk?.pedestrians"
        label="Pedestrian Through Zone (PTZ)"
        :maxWidth="8"
        :portion="sidewalk.pedestrians"
        @changed="pedestrian = $event"
      />
      <Portion
        v-if="sidewalk?.furnishings"
        label="Furnishing Zone"
        :maxWidth="6"
        :portion="sidewalk.furnishings"
        @changed="furnishings = $event"
      />
    </main>
  </article>
</template>
