<template>
  <Box
    as="form"
    color="gray"
    variant="light"
    title="Search"
    role="search"
    action="/"
    class="
      inline-flex
      flex-wrap
      items-center
      border border-gray-500
      shadow-md
      rounded-md
    "
    @submit.prevent="handleSubmit"
  >
    <Dropdown type="button" label="Search settings" id="menu-button">
      <template v-slot:label>
        <Icon type="adjustment" class="w-5 h-5" />
      </template>
      <template v-slot="{ open, id }">
        <DropdownList
          :open="open"
          :id="id"
          color="gray"
          variant="light"
          class="
            absolute
            origin-top-left
            left-0
            mt-3
            rounded-md
            shadow-md
            border border-gray-500
          "
        >
          <DropdownItem>
            <div class="w-full px-2 py-1 inline-flex items-center space-x-3">
              <input
                type="radio"
                id="address"
                name="searchType"
                value="address"
                v-model="type"
              />
              <label for="address">Address or intersection</label>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div class="w-full px-2 py-1 inline-flex items-center space-x-3">
              <input
                type="radio"
                id="taxlot"
                name="searchType"
                value="taxlot"
                v-model="type"
              />
              <label for="taxlot">Tax lot number</label>
            </div>
          </DropdownItem>
        </DropdownList>
      </template>
    </Dropdown>
    <label for="query" class="sr-only">Address</label>
    <input
      id="query"
      name="query"
      type="search"
      role="searchbox"
      :placeholder="placeholder"
      required="required"
      v-model="query"
      class="
        flex-1
        min-w-0
        appearance-none
        bg-transparent
        placeholder-gray-600
        border-transparent
        rounded
        focus:outline-none focus:shadow-outline
      "
    />
    <Button color="transparent" label="Search">
      <Icon type="search" class="w-5 h-5" />
    </Button>
  </Box>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import Box from '@/elements/box/Box';
import Button from '@/elements/button/Button.vue';
import Dropdown from '@/components/dropdown/Dropdown.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import DropdownList from '@/components/dropdown/DropdownList.vue';
import Icon from '@/elements/icon/Icon.vue';

export default defineComponent({
  name: 'AddressSuggest',
  components: {
    Box,
    Button,
    Dropdown,
    DropdownItem,
    DropdownList,
    Icon,
  },
  props: {
    candidates: Array,
  },
  setup(_, { emit }) {
    const query = ref('');
    const type = ref('address');

    return {
      query,
      type,
      placeholder: computed(() => {
        switch (type.value) {
          case 'address':
            return 'Search addresses...';
          case 'taxlot':
            return 'Search tax lots...';
          default:
            throw new Error(`Unrecognized search type: ${type.value}`);
        }
      }),
      handleSubmit() {
        emit('search', { query: query.value, type: type.value });
      },
    };
  },
});
</script>
