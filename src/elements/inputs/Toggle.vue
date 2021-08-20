<template>
  <div class="inline-flex items-center space-x-2">
    <button
      :id="id"
      role="switch"
      :aria-checked="String(modelValue)"
      :aria-labelledby="`${id}-label`"
      class="inline-flex items-center border border-current rounded text-sm"
      @click="toggle"
    >
      <span class="px-1">on</span>
      <span class="px-1">off</span>
    </button>
    <slot>
      <label :id="`${id}-label`">{{ label }}</label>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'Toggle',
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

<style scoped>
[role='switch'][aria-checked='false'] :first-child,
[role='switch'][aria-checked='true'] :last-child {
  @apply bg-black text-white;
}
</style>
