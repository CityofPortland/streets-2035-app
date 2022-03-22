<template>
  <div class="min-h-screen flex flex-col font-sans">
    <Header
      :color="header.color"
      :open="menuOpen"
      @toggle="menuOpen = !menuOpen"
    >
      <template v-slot:branding>
        <router-link to="/" class="w-full flex items-center">
          <Logo class="w-16 md:w-20 mr-3 flex-shrink-0" />
          <span class="truncate text-xl">Streets 2035</span>
        </router-link>
      </template>
      <template v-slot:menu>
        <Nav :list-class="'flex flex-col md:flex-row md:space-x-3'">
          <router-link to="/streets" custom v-slot="{ href }">
            <NavItem :url="href" text="Map" />
          </router-link>
          <router-link to="/street-types" custom v-slot="{ href }">
            <NavItem :url="href" text="Street types" />
          </router-link>
        </Nav>
        <Nav class="md:ml-auto">
          <SignIn v-if="!user" />
          <LoggedIn v-else />
        </Nav>
      </template>
    </Header>
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer color="gray" variant="light">
      <template v-slot:middle>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Nav title="General information">
            <nav-item>
              <Anchor url="//portland.gov">City of Portland</Anchor>
            </nav-item>
            <nav-item>
              <Anchor url="//portland.gov/transportation"
                >Portland Bureau of Transportation</Anchor
              >
            </nav-item>
          </Nav>
          <Nav title="Legal notices">
            <nav-item>
              <router-link
                to="/disclaimer"
                class="border-b-2 border-current font-medium"
                >Disclaimer</router-link
              >
            </nav-item>
          </Nav>
        </div>
      </template>
    </Footer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
} from 'vue';

import Anchor from '@/elements/anchor/Anchor.vue';
import Footer from '@/components/footer/Footer.vue';
import Header from '@/components/header/Header.vue';
import Logo from '@/components/Logo.vue';
import LoggedIn from '@/components/login/LoggedIn.vue';
import Nav from '@/components/nav/Nav.vue';
import NavItem from '@/components/nav/NavItem.vue';
import SignIn from '@/components/login/SignIn.vue';
import {
  getModels,
  STREET_CLASSIFICATION_KEY,
  ViewModel,
} from './composables/use-street-classification';
import { useAuthStore } from '@/store/auth';
import { useHeaderStore } from '@/store/header';

export default defineComponent({
  setup() {
    const menuOpen = ref(false);

    const headerStore = useHeaderStore();
    const authStore = useAuthStore();

    let models = reactive(new Array<ViewModel>());
    provide(STREET_CLASSIFICATION_KEY, models);

    onMounted(async () => {
      authStore.initialize();
      models.push(...(await getModels()));
    });

    return {
      menuOpen,
      header: computed(() => headerStore.header),
      user: computed(() => authStore.user),
    };
  },
  components: {
    Anchor,
    Footer,
    Header,
    LoggedIn,
    Logo,
    Nav,
    NavItem,
    SignIn,
  },
});
</script>
