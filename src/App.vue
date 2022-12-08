<template>
  <div class="min-h-screen flex flex-col font-sans">
    <Header :open="menuOpen" @toggle="menuOpen = !menuOpen">
      <template v-slot:branding>
        <router-link to="/" class="w-full flex items-center">
          <Logo class="w-16 md:w-20 mr-3 flex-shrink-0" />
          <span class="truncate text-xl">StreetsPDX</span>
        </router-link>
      </template>
      <template v-slot:menu>
        <Nav
          class="md:ml-auto"
          list-class="flex flex-col gap-2 md:gap-3 md:flex-row md:items-center"
        >
          <NavItem text="Street Types" to="/street-types" />
          <NavItem text="Capital Projects" to="/capital-projects" />
          <NavItem text="Public Improvements" to="/public-improvements" />
          <NavItem
            text="Right-of-way Policies"
            to="//portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way"
          />
          <NavItem text="Street Map" to="/streets" />
          <NavItem text="Cross-Sections" to="/cross-section" />
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
            <NavItem to="https://portland.gov">City of Portland</NavItem>
            <NavItem to="https://portland.gov/transportation"
              >Portland Bureau of Transportation</NavItem
            >
          </Nav>
          <Nav title="Legal notices">
            <NavItem to="/disclaimer">Disclaimer</NavItem>
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

    const models = reactive(new Array<ViewModel>());
    provide(STREET_CLASSIFICATION_KEY, models);

    onMounted(async () => {
      models.push(...(await getModels()));
    });

    return {
      menuOpen,
      header: computed(() => headerStore.header),
      user: computed(() => authStore.user),
      handleClick: () => console.log('click!'),
    };
  },
  components: {
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
