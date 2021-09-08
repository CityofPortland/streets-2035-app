<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
    <span class="font-semibold text-lg capitalize">
      <slot name="name">{{ name }}</slot>
    </span>
    <span class="md:col-span-2 prose">
      <slot>{{ value }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Field',
  props: {
    name: { type: String, required: true },
    value: { type: String },
  },
});
</script>
