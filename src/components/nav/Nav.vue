<template>
  <nav>
    <h2 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h2>
    <ul class="list-none" v-bind="$attrs">
      <slot></slot>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Nav',
  inheritAttrs: false,
  props: {
    title: String,
  },
});
</script>
