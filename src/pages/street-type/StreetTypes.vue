<template>
  <div
    class="flex flex-col md:flex-row md:justify-between max-w-7xl w-full mx-auto px-4 mt-4"
  >
    <aside class="md:w-1/4 order-last">
      <Nav title="Sections" class="my-2">
        <NavItem
          v-for="(page, idx) in pages"
          :key="idx"
          :text="page[1].name"
          :to="{ name: 'StreetTypes', params: { page: page[0] } }"
          class="my-2"
        />
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
        'civic-corridor',
        {
          name: 'Civic Corridors',
          component: defineAsyncComponent(() => import('./CivicCorridor.mdx')),
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
      [
        'neighborhood-corridor',
        {
          name: 'Neighborhood Corridors',
          component: defineAsyncComponent(
            () => import('./NeighborhoodCorridor.mdx')
          ),
        },
      ],
      [
        'neighborhood-main-street',
        {
          name: 'Neighborhood Main Streets',
          component: defineAsyncComponent(
            () => import('./NeighborhoodMainStreet.mdx')
          ),
        },
      ],
      [
        'community-corridor',
        {
          name: 'Community Corridors',
          component: defineAsyncComponent(
            () => import('./CommunityCorridor.mdx')
          ),
        },
      ],
      [
        'local-street',
        {
          name: 'Local Streets',
          component: defineAsyncComponent(() => import('./LocalStreet.mdx')),
        },
      ],
      [
        'industrial-road',
        {
          name: 'Industrial Roads',
          component: defineAsyncComponent(() => import('./IndustrialRoad.mdx')),
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
<style>
.prose p:first-child {
  @apply mt-0;
}

.prose ul:first-child {
  @apply mt-0;
}

.prose li:first-child {
  @apply mt-0;
}

.prose p:last-child {
  @apply mb-0;
}
</style>
