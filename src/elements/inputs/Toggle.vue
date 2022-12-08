<template>
  <div class="inline-flex items-center space-x-2 cursor-pointer">
    <Box
      as="button"
      type="button"
      v-bind="$attrs"
      :id="id"
      :color="modelValue ? 'blue' : 'red'"
      variant="light"
      role="switch"
      :aria-checked="String(modelValue)"
      :aria-labelledby="`${id}-label`"
      class="inline-flex items-center border border-current rounded-md p-1 focus:ring-2 focus:ring-offset-1 focus:ring-current"
      @click="toggle"
    >
      <Box
        as="span"
        :color="modelValue ? 'blue' : 'transparent'"
        class="px-1 rounded-md"
        :class="{ 'shadow-lg': modelValue }"
        >{{ trueLabel }}</Box
      >
      <Box
        as="span"
        :color="modelValue ? 'transparent' : 'red'"
        class="px-1 rounded-md"
        :class="{ 'shadow-lg': modelValue }"
        >{{ falseLabel }}</Box
      >
    </Box>
    <slot>
      <label :id="`${id}-label`">{{ label }}</label>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';

import Box from '@/elements/box/Box';

export default defineComponent({
  name: 'Toggle',
  components: { Box },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    trueLabel: {
      type: String,
      default: 'on',
    },
    falseLabel: {
      type: String,
      default: 'off',
    },
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    return {
      toggle() {
        emit('update:modelValue', !modelValue.value);
      },
    };
  },
});
</script>
