<template>
  <Box
    as="button"
    :color="color"
    :variant="variant"
    :class="[...sizeClasses, ...baseClasses]"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </Box>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { ButtonProps, ButtonSize } from './Button.types';

import Box, { BoxColor, BoxColorVariant } from '@/elements/box/Box';

export default defineComponent({
  name: 'pbot-button',
  components: { Box },
  props: {
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
      default: 'blue',
    },
    variant: {
      type: String as () => BoxColorVariant,
      default: 'neutral',
    },
  },
  emits: ['click'],
  setup(props: ButtonProps, { emit }) {
    const baseClasses = [
      'rounded-md',
      'shadow',
      'cursor-pointer',
      'focus:outline-none',
      'focus:ring',
    ];

    const sizeClasses = computed(() => {
      const sizeMap = new Map<ButtonSize, string[]>([
        ['small', ['px-2', 'py-1', 'text-sm']],
        ['medium', ['px-3', 'py-2']],
        ['large', ['px-4', 'py-3', 'text-lg']],
      ]);

      return props.size && sizeMap.get(props.size);
    });

    const onClick = () => {
      emit('click');
    };

    return {
      baseClasses,
      sizeClasses,
      onClick,
    };
  },
});
</script>
