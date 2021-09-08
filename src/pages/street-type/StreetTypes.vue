<template>
  <div
    class="
      flex flex-col
      md:flex-row md:justify-between
      max-w-7xl
      w-full
      mx-auto
      px-4
      mt-4
    "
  >
    <aside class="md:w-1/4 order-last">
      <Nav title="Sections">
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
    </aside>
    <article class="mb-8 md:w-3/4 md:pr-4">
      <router-view></router-view>
    </article>
  </div>
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
    return {
      links: new Map([
        ['', 'Overview'],
        ['civic-main-street', 'Civic Main Streets'],
      ]),
    };
  },
});
</script>
