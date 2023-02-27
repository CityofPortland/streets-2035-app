<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue';
import {
  LocationAsRelativeRaw,
  RouteLocationOptions,
  RouteParamsRaw,
  RouteQueryAndHash,
  useRoute,
  useRouter,
} from 'vue-router';
import { widths, useCrossSection } from '@/composables/cross-section';
import { Street } from '@/composables/use-street';
import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import { PRIORITIES, Priority } from '@/components/cross-section/typings';
import Scoresheet from '@/components/cross-section/Scoresheet.vue';
import Select from '@/elements/inputs/Select.vue';
import Toggle from '@/elements/inputs/Toggle.vue';
import Legend from '@/components/cross-section/Legend.vue';

const props = defineProps({
  width: { type: Number, required: true },
  mainStreet: { type: Boolean, default: false },
  pedestrianPriority: { type: String as () => Priority, default: 'higher' },
  bicyclePriority: { type: String as () => Priority, default: 'higher' },
  transitPriority: { type: String as () => Priority, default: 'higher' },
  freightPriority: { type: String as () => Priority, default: 'higher' },
  trafficPriority: { type: String as () => Priority, default: 'higher' },
});

const {
  bicyclePriority,
  freightPriority,
  mainStreet,
  pedestrianPriority,
  trafficPriority,
  transitPriority,
  width,
} = toRefs(props);

const street: ComputedRef<Partial<Street>> = computed(() => ({
  width: width.value,
}));

const { options } = useCrossSection(street);

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
    <header class="prose prose-lg mb-8">
      <h1 class="capitalize">{{ width }} foot cross sections</h1>
      <p>
        The StreetsPDX Cross-Section tool visualizes options for use of the
        right-of-way, focused on the space between the curbs. It allows you to
        set various priorities (which populate automatically when you reach this
        page from the
        <router-link to="/streets" custom v-slot="{ href, navigate }">
          <Anchor :url="href" @click="navigate"
            >Street Map</Anchor
          > </router-link
        >) and evaluate potential cross sections to meet capital projects goals.
        This tool makes clear that there are always tradeoffs between potential
        cross sections. Priority designations, project goals, and analyses of
        tradeoffs inform which section(s) are advanced. To get started, review
        the
        <router-link to="/capital-projects" custom v-slot="{ href, navigate }">
          <Anchor :url="href" @click="navigate">City Projects page</Anchor>
        </router-link>
        which describes how to use this tool for a given project. For more help
        using this tool and the rest of this site, use the
        <router-link to="/training" custom v-slot="{ href, navigate }">
          <Anchor :url="href" @click="navigate"
            >training page</Anchor
          > </router-link
        >.
      </p>
    </header>
    <section>
      <Box as="form" class="flex flex-row flex-wrap gap-4">
        <div class="flex flex-col">
          <label class="font-semibold">Roadway width</label>
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
            <label class="hidden">Main street</label>
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
        <router-link
          :to="{
            name: 'CrossSectionOption',
            params: { width, ordinal: option.ordinal },
          }"
          custom
          v-slot="{ href, navigate }"
        >
          <Image
            :src="`${publicPath}img/cross-section/${width}/${option.continuousImage}.webp`"
            :sizes="[640]"
            @click="navigate"
            class="cursor-pointer"
          />
          <Box
            color="gray"
            variant="light"
            class="p-2 flex justify-center rounded-md"
          >
            <Anchor :url="href" @click="navigate">{{ option.name }}</Anchor>
          </Box>
        </router-link>
      </template>
    </Scoresheet>
    <Legend class="my-4 prose" />
  </article>
</template>
