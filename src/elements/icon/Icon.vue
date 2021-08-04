<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      v-for="(path, index) in paths"
      :key="index"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="path"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import icons from './icons';

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      paths: computed(() =>
        Array.isArray(icons[props.type])
          ? icons[props.type]
          : [icons[props.type]]
      ),
    };
  },
});
</script>
