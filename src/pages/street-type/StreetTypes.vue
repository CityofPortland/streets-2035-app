<template>
  <section class="flex flex-col md:flex-row md:justify-between">
    <Nav title="Street types" class="md:w-1/4 order-last">
      <router-link
        v-for="(item, idx) in links"
        :key="idx"
        :to="`/street-types/${item[0]}`"
        custom
        v-slot="{ href }"
      >
        <NavItem :url="href" :text="item[1]" />
      </router-link>
    </Nav>
    <section class="mb-8 md:w-3/4 md:pr-4">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

import Nav from '@/components/nav/Nav.vue';
import NavItem from '@/components/nav/NavItem.vue';

export default defineComponent({
  name: 'StreetTypes',
  components: { Nav, NavItem },
  props: {
    page: { type: Object },
  },
  setup() {
    console.log('In StreetType...');
    return {
      links: new Map([['street-type-1', 'Street type 1']]),
    };
  },
});
</script>
