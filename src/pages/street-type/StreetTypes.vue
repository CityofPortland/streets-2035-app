<template>
  <div
    class="flex flex-col md:flex-row md:justify-between max-w-7xl w-full mx-auto px-4 mt-4"
  >
    <aside class="md:w-1/4 order-last">
      <Nav title="Sections">
        <router-link
          v-for="(page, idx) in pages"
          :key="idx"
          :to="{ name: 'StreetTypes', params: { page: page[0] } }"
        >
          <NavItem :text="page[1].name" />
        </router-link>
      </Nav>
    </aside>
    <article class="mb-8 md:w-3/4 md:pr-4">
      <component :is="currentPage"></component>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, markRaw } from 'vue';
import { useRouter } from 'vue-router';

import Nav from '@/components/nav/Nav.vue';
import NavItem from '@/components/nav/NavItem.vue';

export default defineComponent({
  name: 'StreetTypes',
  components: { Nav, NavItem },
  setup() {
    const { currentRoute } = useRouter();

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
          component: defineAsyncComponent(
            () => import('./CivicMainStreet.mdx')
          ),
        },
      ],
    ]);

    const currentPage = computed(() => {
      let page = currentRoute.value.params.page;
      page = Array.isArray(page) ? page[0] : page;

      const currentPage = pages.get(page);

      return currentPage ? markRaw(currentPage.component) : undefined;
    });

    return {
      currentPage,
      pages,
    };
  },
});
</script>
