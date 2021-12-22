<template>
  <div class="inline-flex items-center space-x-2">
    <Box
      as="button"
      :color="modelValue ? 'blue' : 'red'"
      variant="light"
      :id="id"
      role="switch"
      :aria-checked="String(modelValue)"
      :aria-labelledby="`${id}-label`"
      class="inline-flex items-center border border-current rounded text-xs p-1 focus:ring-2 focus:ring-offset-1 focus:ring-current"
      @click="toggle"
    >
      <Box
        as="span"
        :color="modelValue ? 'blue' : 'transparent'"
        class="px-1 rounded"
        >on</Box
      >
      <Box
        as="span"
        :color="modelValue ? 'transparent' : 'red'"
        class="px-1 rounded"
        >off</Box
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
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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

<style scoped></style>
