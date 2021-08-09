import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Disclaimer from '@/pages/Disclaimer.vue';
import Home from '@/pages/Home.vue';
import StreetTypes from '@/pages/street-type/StreetTypes.vue';
import Overview from '@/pages/street-type/Overview.vue';
import StreetType1 from '@/pages/street-type/StreetType1.vue';

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
    path: '/street-types',
    name: 'StreetTypes',
    component: StreetTypes,
    children: [
      {
        path: '',
        component: Overview,
      },
      {
        path: 'street-type-1',
        component: StreetType1,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
