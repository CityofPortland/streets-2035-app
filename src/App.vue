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
          <li>
            <Dropdown label="Street types" id="street-types">
              <template v-slot:label="{ label, open }">
                <router-link
                  to="/street-types"
                  custom
                  v-slot="{ href, navigate }"
                >
                  <Anchor :url="href" @click.stop="navigate">{{
                    label
                  }}</Anchor>
                </router-link>
                <Icon
                  aria-label="Open dropdown"
                  type="solid"
                  :name="open ? 'chevron-up' : 'chevron-down'"
                  class="ml-2 w-5 h-5"
                />
              </template>
              <template v-slot:default="{ open, toggle }">
                <DropdownList
                  as="ul"
                  id="street-types"
                  :open="open"
                  class="md:absolute md:bg-white p-3 mt-8 md:min-w-max"
                >
                  <NavItem
                    v-for="x in [
                      ['civic-main-street', 'Civic Main Streets'],
                      ['civic-corridor', 'Civic Corridors'],
                      ['neighborhood-main-street', 'Neighborhood Main Streets'],
                      ['neighborhood-corridor', 'Neighborhood Corridors'],
                      ['community-corridor', 'Community Corridors'],
                      ['local-street', 'Local Streets'],
                      ['industrial-road', 'Industrial Roads'],
                    ]"
                    :key="x"
                    :text="x[1]"
                    :to="`/street-types/${x[0]}`"
                    @click="toggle"
                  />
                </DropdownList>
              </template>
            </Dropdown>
          </li>
          <NavItem text="City Projects" to="/city-projects" />
          <NavItem
            text="Development Improvements"
            to="/development-improvements"
          />
          <NavItem
            text="Right-of-way Policies"
            to="//portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way"
          />
          <li>
            <Dropdown label="Tools" id="tools">
              <template v-slot:default="{ open }">
                <DropdownList
                  as="ul"
                  id="tools"
                  :open="open"
                  class="md:absolute md:bg-white p-3 mt-8 md:-ml-16 md:min-w-max"
                >
                  <NavItem text="Street Map" to="/streets" />
                  <NavItem text="Cross-Sections Viewer" to="/cross-section" />
                  <NavItem
                    text="Sidewalk Tradeoffs Evaluation"
                    to="/sidewalk-tradeoffs"
                  />
                </DropdownList>
              </template>
            </Dropdown>
          </li>
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
import { computed, defineComponent, onMounted, ref } from 'vue';

import Dropdown from './components/dropdown/Dropdown.vue';
import DropdownList from './components/dropdown/DropdownList.vue';
import Footer from '@/components/footer/Footer.vue';
import Header from '@/components/header/Header.vue';
import Icon from './elements/icon/Icon.vue';
import Logo from '@/components/Logo.vue';
import Nav from '@/components/nav/Nav.vue';
import NavItem from '@/components/nav/NavItem.vue';
import { useHeaderStore } from '@/store/header';
import Anchor from './elements/anchor/Anchor.vue';
import { useClassificationStore } from './store/classification';

export default defineComponent({
  setup() {
    const menuOpen = ref(false);

    const headerStore = useHeaderStore();
    const { init } = useClassificationStore();

    onMounted(() => init());

    return {
      menuOpen,
      header: computed(() => headerStore.header),
    };
  },
  components: {
    Dropdown,
    DropdownList,
    Footer,
    Header,
    Icon,
    Logo,
    Nav,
    NavItem,
    Anchor,
  },
});
</script>
