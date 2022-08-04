<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useCrossSection } from '@/composables/cross-section';
import Anchor from '@/elements/anchor/Anchor.vue';
import Image from '@/elements/img/Image.vue';
import Message from '@/components/message/Message.vue';
import Scoresheet from '@/components/cross-section/Scoresheet.vue';

const props = defineProps({
  width: { type: Number, required: true },
  ordinal: { type: Number, required: true },
});

const { width, ordinal } = toRefs(props);
const publicPath = process.env.BASE_URL;

const { options } = useCrossSection(ref({ width: width.value }));

const option = computed(() =>
  options.value.find((o) => o.ordinal == ordinal.value)
);
</script>

<template>
  <article class="flex flex-col gap-1 max-w-7xl px-4 mx-auto">
    <nav>
      <router-link
        :to="{ name: 'CrossSectionList', param: { width } }"
        custom
        v-slot="{ href, navigate }"
      >
        <Anchor :url="href" @click="navigate">Back to list</Anchor>
      </router-link>
    </nav>
    <header class="prose mb-8">
      <h1 class="capitalize">
        {{ width }} foot cross sections: {{ option?.name }}
      </h1>
    </header>
    <Message
      v-if="!option"
      color="red"
      variant="light"
      summary="Failed to load cross section"
    >
      <p>
        No cross section was found for width of {{ width }} feet and name '{{
          option
        }}'
      </p>
    </Message>
    <main v-else>
      <header class="prose">
        <h2>Continuous cross-section</h2>
      </header>
      <section class="grid grid-cols-1 md:grid-cols-3 items-center">
        <div class="md:col-span-2">
          <Image
            :src="`${publicPath}img/cross-section/${width}/${option.continuousImage}.webp`"
          />
        </div>
        <div>
          <Scoresheet :options="[option]" />
        </div>
      </section>
      <section class="relative">
        <header class="prose">
          <h2>Episodic cross-sections</h2>
        </header>
        <div
          class="md:grid justify-between"
          :style="`grid-template-columns: repeat(${option?.episodicImages.length}, auto)`"
        >
          <Image
            v-for="(image, index) in option?.episodicImages"
            :key="index"
            :src="`${publicPath}img/cross-section/${width}/${image}.webp`"
            class="max-h-96"
          />
        </div>
      </section>
    </main>
  </article>
</template>
