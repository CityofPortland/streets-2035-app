<template>
  <div class="relative inline-block text-left">
    <div>
      <Button
        :as="as"
        :color="color"
        :variant="variant"
        id="menu-button"
        :aria-expanded="open"
        aria-haspopup="true"
        class="inline-flex items-center gap-3"
        @click="open = !open"
      >
        <slot>{{ label }}</slot>
        <Icon :type="open ? 'chevron-up' : 'chevron-down'" class="w-4 h-4" />
      </Button>
    </div>
    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        class="
          origin-top-right
          absolute
          right-0
          mt-2
          w-64
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
        :class="open ? 'flex' : 'hidden'"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1 w-full" role="none">
          <slot name="menu"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from '@/elements/button/Button.vue';
import { ButtonSize } from '@/elements/button/Button.types';
import Icon from '@/elements/icon/Icon.vue';
import { BoxColor, BoxColorVariant } from '@/elements/box/Box';

export default defineComponent({
  name: 'DropDown',
  components: { Button, Icon },
  props: {
    as: {
      type: String,
      default: 'button',
    },
    label: {
      type: String,
      required: true,
    },
    size: {
      type: String as () => ButtonSize,
      default: 'medium',
    },
    color: {
      type: String as () => BoxColor,
      default: 'transparent',
    },
    variant: {
      type: String as () => BoxColorVariant,
      default: 'neutral',
    },
  },
  setup() {
    const open = ref(false);

    return {
      open,
    };
  },
});
</script>
