import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CityProjects from '@/pages/CityProjects.vue';
import Disclaimer from '@/pages/Disclaimer.vue';
import Home from '@/pages/Home.vue';
import DevelopmentImprovements from '@/pages/development-improvements/Page.vue';
import SidewalkTradeoffs from '@/pages/sidewalk-tradeoff/Page.vue';
import Streets from '@/pages/Streets.vue';
import StreetTypes from '@/pages/street-type/StreetTypes.vue';
import Training from '@/pages/Training.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/city-projects',
    name: 'CityProjects',
    component: CityProjects,
  },

  {
    path: '/cross-section',
    redirect: () => ({
      name: 'CrossSectionList',
      params: { width: '36' },
    }),
  },
  {
    path: '/cross-section/:width',
    name: 'CrossSectionList',
    component: () => import('@/pages/cross-section/List.vue'),
    props: (route) => {
      const width = route.params.width as string;
      const mainStreet = route.query.mainStreet === 'true';
      const pedestrianPriority = route.query.pedestrianPriority;
      const bicyclePriority = route.query.bicyclePriority;
      const transitPriority = route.query.transitPriority;
      const freightPriority = route.query.freightPriority;
      const trafficPriority = route.query.trafficPriority;

      return {
        width: Number.parseInt(width),
        mainStreet,
        pedestrianPriority,
        bicyclePriority,
        transitPriority,
        freightPriority,
        trafficPriority,
      };
    },
  },
  {
    path: '/cross-section/:width/:ordinal',
    name: 'CrossSectionOption',
    component: () => import('@/pages/cross-section/Option.vue'),
    props: (route) => {
      const width = route.params.width as string;
      const ordinal = route.params.ordinal as string;

      return {
        width: Number.parseInt(width),
        ordinal: Number.parseInt(ordinal),
      };
    },
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: Disclaimer,
  },
  {
    path: '/development-improvements',
    name: 'DevelopmentImprovements',
    component: DevelopmentImprovements,
  },
  {
    path: '/sidewalk-tradeoffs',
    name: 'SidewalkTradeoffs',
    component: SidewalkTradeoffs,
    beforeEnter(to) {
      if (!to.query.streetType) {
        return {
          ...to,
          query: {
            streetType: 'CIC',
            pedestrianDistrict: 'false',
          },
        };
      }
    },
    props: (route) => {
      const pedestrianDistrict = route.query.pedestrianDistrict === 'true';
      const streetType = route.query.streetType;

      return {
        streetType,
        pedestrianDistrict,
      };
    },
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
    path: '/training',
    name: 'Training',
    component: Training,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    if (savedPosition) {
      return savedPosition;
    }

    if (to.path != from.path) {
      return { top: 0 };
    }

    return false;
  },
});

export default router;
