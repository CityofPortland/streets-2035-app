<template>
  <main class="flex flex-col md:flex-row">
    <nav class="md:w-1/4">
      <ul>
        <router-link
          v-for="(item, idx) in links"
          :key="idx"
          :to="`/street-types/${item[0]}`"
          custom
          v-slot="{ href }"
        >
          <NavItem :url="href" :text="item[1]" />
        </router-link>
      </ul>
    </nav>
    <MDXProvider :components="components">
      <StreetType1 />
    </MDXProvider>
  </main>
</template>

<script>
import { defineComponent, h } from 'vue';

import Box from '@/elements/box/Box';
import NavItem from '@/components/nav/NavItem.vue';

import StreetType1 from '@/pages/street-type/StreetType1.mdx';

export default defineComponent({
  name: 'StreetTypes',
  components: { NavItem, StreetType1 },
  props: {
    page: { type: Object },
  },
  setup(_, { slots }) {
    console.log('In StreetType...');
    return {
      links: new Map([['street-type-1', 'Street type 1']]),
      components: {
        wrapper: 'article',
        h1: () => h('h1', { class: 'text-2xl' }, slots.default),
        Box: Box,
      },
    };
  },
});
</script>
