<template>
  <div
    class="flex flex-col md:flex-row md:justify-between max-w-7xl w-full mx-auto px-4 mt-4"
  >
    <aside class="md:w-1/4 order-last">
      <Nav title="Sections">
        <router-link
          v-for="(page, idx) in pages"
          :key="idx"
          :to="`/street-types/${page[0]}`"
          custom
          v-slot="{ href }"
        >
          <NavItem :url="href" :text="page[1].name" />
        </router-link>
      </Nav>
    </aside>
    <article class="mb-8 md:w-3/4 md:pr-4">
      <component :is="currentPage"></component>
    </article>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, markRaw } from 'vue';

import Nav from '@/components/nav/Nav.vue';
import NavItem from '@/components/nav/NavItem.vue';

export default defineComponent({
  name: 'StreetTypes',
  components: { Nav, NavItem },
  props: {
    page: String,
  },
  setup(props) {
    const pages = new Map([
      [
        '',
        {
          name: 'Overview',
          component: defineAsyncComponent(() => import('./Overview.mdx')),
        },
      ],
      [
        'civic-main-street',
        {
          name: 'Civic Main Streets',
          component: defineAsyncComponent(() =>
            import('./CivicMainStreet.mdx')
          ),
        },
      ],
    ]);

    const currentPage = markRaw(pages.get(props.page).component);

    return {
      currentPage,
      pages,
    };
  },
});
</script>
