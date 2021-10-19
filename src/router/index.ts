import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Disclaimer from '@/pages/Disclaimer.vue';
import Home from '@/pages/Home.vue';
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
    path: '/street-types/:page?',
    name: 'StreetTypes',
    component: StreetTypes,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
