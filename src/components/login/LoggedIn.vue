<template>
  <Dropdown label="User information" id="menu-button" class="w-full">
    <template v-slot:label="{ open }">
      <article class="inline-flex items-center space-x-2 w-full">
        <header class="md:flex-1">
          <img
            v-if="photo"
            class="w-6 h-6 rounded-full"
            :src="photo"
            :alt="`Avatar image for logged in user`"
          />
        </header>
        <main class="flex-1 inline-flex items-center justify-between">
          <span>{{ user?.givenName }}</span>
          <Icon
            type="solid"
            name="chevron-down"
            class="w-5 h-5 transition ease-in-out duration-100"
            :class="{ transform: open, 'rotate-180': open }"
          />
        </main>
      </article>
    </template>
    <template v-slot="{ open }">
      <DropdownList
        id="user-menu"
        :open="open"
        color="white"
        class="md:origin-top-right md:absolute md:right-0 w-full md:min-w-max mt-4 grid grid-cols-1 gap-2"
      >
        <DropdownItem>
          <FieldList class="gap-1 text-sm">
            <Field display="above" name="E-Mail Address">{{
              user?.mail
            }}</Field>
          </FieldList>
        </DropdownItem>
        <DropdownItem>
          <RouterLink to="/logout">
            <Button
              as="span"
              label="Log out"
              size="small"
              color="gray"
              variant="light"
              >Log out</Button
            >
          </RouterLink>
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Button from '@/elements/button/Button.vue';
import Dropdown from '@/components/dropdown/Dropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownList from '@/components/dropdown/DropdownList.vue';
import Field from '@/components/field/Field.vue';
import FieldList from '@/components/field/FieldList.vue';
import Icon from '@/elements/icon/Icon.vue';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  components: {
    Button,
    Dropdown,
    DropdownItem,
    DropdownList,
    Field,
    FieldList,
    Icon,
  },
  setup() {
    const store = useAuthStore();

    return {
      user: computed(() => store.user),
      photo: computed(() =>
        store.user && store.user.photo
          ? URL.createObjectURL(store.user.photo)
          : undefined
      ),
    };
  },
});
</script>
