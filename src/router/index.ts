import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Disclaimer from '@/pages/Disclaimer.vue';
import Home from '@/pages/Home.vue';
import Streets from '@/pages/Streets.vue';
import StreetTypes from '@/pages/street-type/StreetTypes.vue';

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
    path: '/streets/:id?',
    name: 'Streets',
    component: Streets,
  },
  {
    path: '/street-types/:page?',
    name: 'StreetTypes',
    component: StreetTypes,
    props: true,
  },
  {
    path: '/cross-section/:width/:designClassification/:subClassification',
    name: 'CrossSection',
    component: () => import('@/pages/CrossSection.vue'),
    props: (route) => {
      const { designClassification, subClassification } = route.params;
      const width = Array.isArray(route.params.width)
        ? route.params.width[0]
        : route.params.width;
      return {
        width: Number.parseInt(width),
        designClassification,
        subClassification,
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
