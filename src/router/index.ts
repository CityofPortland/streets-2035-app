import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CityProjects from '@/pages/CityProjects.vue';
import Disclaimer from '@/pages/Disclaimer.vue';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Logout from '@/pages/Logout.vue';
import OAuth from '@/pages/OAuth.vue';
import DevelopmentImprovements from '@/pages/development-improvements/Page.vue';
import Streets from '@/pages/Streets.vue';
import StreetTypes from '@/pages/street-type/StreetTypes.vue';

import { useAuthStore } from '@/store/auth';
import { useLogin } from '@/composables/use-login';

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
    path: '/oauth/callback',
    name: 'OAuthCallback',
    component: OAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
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

router.beforeResolve(async (to) => {
  const store = useAuthStore();
  if (!store.isLoggedIn) {
    await store.initialize();
  }

  if (
    !store.user &&
    to.name !== 'Login' &&
    to.name !== 'OAuthCallback' &&
    to.name != 'Logout'
  ) {
    const { saveReturnLocation } = useLogin();

    saveReturnLocation(to);
    return { name: 'Login' };
  }
});

export default router;
