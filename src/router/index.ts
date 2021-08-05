import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Disclaimer from '@/pages/Disclaimer.vue';
import Home from '@/pages/Home.vue';
import StreetTypes from '@/pages/street-type/StreetType.vue';
import StreetType1 from '@/pages/street-type/StreetType1.mdx';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: Disclaimer,
  },
  {
    path: '/street-types/:id?',
    name: 'StreetTypes',
    component: StreetTypes,
    props: (route) => {
      console.log('In async component');

      const pages = new Map([['street-type-1', StreetType1]]);

      const id = Array.isArray(route.params.id)
        ? route.params.id[0]
        : route.params.id;

      return {
        page: pages.has(id) ? pages.get(id) : Error('No page with that id'),
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
