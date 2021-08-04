<template>
  <select
    :id="id"
    :name="name"
    :class="classes"
    :required="required"
    @change="handleChange"
  >
    <option value="" disabled selected>{{ placeholder }}</option>
    <slot></slot>
  </select>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

import { useInput } from './inputs';

export default defineComponent({
  name: 'Select',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Select option',
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    const { disabled, modelValue, required } = toRefs(props);

    const { classes } = useInput(required, disabled, modelValue);

    return {
      classes,
      handleChange,
    };
  },
});
</script>
