<template>
  <Box
    as="fieldset"
    :color="color"
    :variant="variant"
    class="border-current rounded-md shadow"
  >
    <Box
      as="legend"
      :color="color"
      :variant="variant"
      class="w-full border-current border rounded-t-md"
      :class="{
        'border-b-0': open,
        'rounded-b-md': !open,
      }"
    >
      <button
        class="p-2 w-full flex items-center justify-between focus:outline-none focus:shadow-outline"
        @click="toggle()"
      >
        <slot name="header">
          <h2 class="flex items-center space-x-2">
            <Icon v-if="icon" type="outline" :name="icon" class="w-6 h-6" />
            <span>{{ name }}</span>
          </h2>
        </slot>
        <Icon
          type="solid"
          :name="open ? 'chevron-up' : 'chevron-down'"
          class="w-5 h-5"
        />
      </button>
    </Box>
    <div
      v-show="open"
      :aria-expanded="open"
      class="p-2 border border-current rounded-b-md"
    >
      <slot></slot>
    </div>
  </Box>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Box, { BoxColor, BoxColorVariant } from '@/elements/box/Box';
import Icon from '@/elements/icon/Icon.vue';

export default defineComponent({
  name: 'Panel',
  components: {
    Box,
    Icon,
  },
  props: {
    as: {
      type: String,
      default: 'fieldset',
    },
    open: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      default: 'Settings',
    },
    color: {
      type: String as () => BoxColor,
      default: 'gray',
    },
    variant: {
      type: String as () => BoxColorVariant,
      default: 'light',
    },
  },
  setup(props, { emit }) {
    return {
      toggle() {
        emit('toggle', !open);
      },
    };
  },
});
</script>
