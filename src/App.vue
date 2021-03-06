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
        <Nav
          list-class="flex flex-col gap-2 md:gap-3 md:flex-row md:items-center"
        >
          <NavItem text="Map" to="/streets" />
          <Dropdown
            label="Information"
            id="information-button"
            class="w-full md:w-auto justify-between"
          >
            <template v-slot="{ open }">
              <DropdownList
                id="information-menu"
                :open="open"
                class="md:origin-top-left md:absolute md:left-0 md:w-64 mt-1 bg-white text-black rounded border border-current shadow-md focus:outline-none"
              >
                <NavItem
                  role="menuitem"
                  text="Street types"
                  to="/street-types"
                />
                <NavItem
                  role="menuitem"
                  text="Public improvements"
                  to="/public-improvements"
                />
              </DropdownList>
            </template>
          </Dropdown>
        </Nav>
        <Nav class="mt-3 md:mt-0 md:ml-auto">
          <SignIn v-if="!user" />
          <LoggedIn v-else />
        </Nav>
      </template>
    </Header>
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer color="gray" variant="light" class="mt-12">
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
import { onBeforeRouteUpdate } from 'vue-router';

import Dropdown from './components/dropdown/Dropdown.vue';
//import DropdownItem from './components/dropdown/DropdownItem.vue';
import DropdownList from './components/dropdown/DropdownList.vue';
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

    onBeforeRouteUpdate(() => {
      console.log('updating rout from App...');
      menuOpen.value = false;
    });

    return {
      menuOpen,
      header: computed(() => headerStore.header),
      user: computed(() => authStore.user),
    };
  },
  components: {
    Dropdown,
    //DropdownItem,
    DropdownList,
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
