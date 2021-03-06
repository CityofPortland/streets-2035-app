<script setup lang="ts">
import { toRefs } from 'vue';
import {
  LocationAsRelativeRaw,
  RouteLocationOptions,
  RouteParamsRaw,
  RouteQueryAndHash,
  useRoute,
  useRouter,
} from 'vue-router';
import { widths, useCrossSection } from '@/composables/cross-section';
import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import { PRIORITIES, Priority } from '@/components/cross-section/typings';
import Scoresheet from '@/components/cross-section/Scoresheet.vue';
import Select from '@/elements/inputs/Select.vue';
import Toggle from '@/elements/inputs/Toggle.vue';

const props = defineProps({
  width: { type: Number, required: true },
  mainStreet: { type: Boolean, default: false },
  pedestrianPriority: { type: String as () => Priority, default: 'high' },
  bicyclePriority: { type: String as () => Priority, default: 'high' },
  transitPriority: { type: String as () => Priority, default: 'high' },
  freightPriority: { type: String as () => Priority, default: 'high' },
  trafficPriority: { type: String as () => Priority, default: 'high' },
});

const {
  width,
  mainStreet,
  pedestrianPriority,
  bicyclePriority,
  transitPriority,
  freightPriority,
  trafficPriority,
} = toRefs(props);

const { options } = useCrossSection(width);

const publicPath = process.env.BASE_URL;

const route = useRoute();
const router = useRouter();

const changeParams = (params: RouteParamsRaw) => {
  changeRoute({
    params: {
      ...route.params,
      ...params,
    },
  });
};

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
    name: route.name || 'CrossSectionList',
    params: {
      ...route.params,
      ...to.params,
    },
    query: {
      ...route.query,
      ...to.query,
    },
  });
};
</script>

<template>
  <article class="flex flex-col gap-1 max-w-7xl px-4 mx-auto">
    <header class="prose mb-8">
      <h1 class="capitalize">{{ width }} foot cross sections</h1>
    </header>
    <section>
      <Box
        as="form"
        class="flex flex-col md:flex-row flex-wrap md:justify-between"
      >
        <div class="flex flex-col">
          <label class="font-semibold">Width</label>
          <Select
            id="width"
            name="width"
            :modelValue="width.toString()"
            @update:modelValue="changeParams({ width: $event })"
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
          <label class="font-semibold">Main street</label>
          <Toggle
            id="mainStreet"
            label="Main street"
            true-label="yes"
            falseLabel="no"
            :modelValue="mainStreet"
            @update:modelValue="changeQuery({ mainStreet: String($event) })"
          >
            <label class="hidden">Main street </label>
          </Toggle>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Pedestrian priority</label>
          <Select
            id="pedestrian"
            name="pedestrian"
            :modelValue="pedestrianPriority.toString()"
            @update:modelValue="changeQuery({ pedestrianPriority: $event })"
          >
            <option
              v-for="(p, index) in PRIORITIES"
              :key="index"
              :value="p"
              :selected="p == pedestrianPriority"
            >
              {{ ''.concat(p.slice(0, 1).toLocaleUpperCase(), p.slice(1)) }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Bicycle priority</label>
          <Select
            id="bicycle"
            name="bicycle"
            :modelValue="bicyclePriority.toString()"
            @update:modelValue="changeQuery({ bicyclePriority: $event })"
          >
            <option
              v-for="(p, index) in PRIORITIES"
              :key="index"
              :value="p"
              :selected="p == bicyclePriority"
            >
              {{ ''.concat(p.slice(0, 1).toLocaleUpperCase(), p.slice(1)) }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Transit priority</label>
          <Select
            id="transit"
            name="transit"
            :modelValue="transitPriority.toString()"
            @update:modelValue="changeQuery({ transitPriority: $event })"
          >
            <option
              v-for="(p, index) in PRIORITIES"
              :key="index"
              :value="p"
              :selected="p == transitPriority"
            >
              {{ ''.concat(p.slice(0, 1).toLocaleUpperCase(), p.slice(1)) }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Freight priority</label>
          <Select
            id="freight"
            name="freight"
            :modelValue="freightPriority.toString()"
            @update:modelValue="changeQuery({ freightPriority: $event })"
          >
            <option
              v-for="(p, index) in PRIORITIES"
              :key="index"
              :value="p"
              :selected="p == freightPriority"
            >
              {{ ''.concat(p.slice(0, 1).toLocaleUpperCase(), p.slice(1)) }}
            </option>
          </Select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Traffic priority</label>
          <Select
            id="traffic"
            name="traffic"
            :modelValue="trafficPriority.toString()"
            @update:modelValue="changeQuery({ trafficPriority: $event })"
          >
            <option
              v-for="(p, index) in PRIORITIES"
              :key="index"
              :value="p"
              :selected="p == trafficPriority"
            >
              {{ ''.concat(p.slice(0, 1).toLocaleUpperCase(), p.slice(1)) }}
            </option>
          </Select>
        </div>
      </Box>
    </section>
    <Scoresheet
      class="py-2"
      :options="options"
      :mainStreet="mainStreet"
      :priorities="{
        pedestrian: pedestrianPriority,
        bicycle: bicyclePriority,
        transit: transitPriority,
        freight: freightPriority,
        traffic: trafficPriority,
      }"
    >
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
