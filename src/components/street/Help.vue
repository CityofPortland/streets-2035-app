<template>
  <div class="flex items-center space-x-2">
    <slot></slot>
    <Icon
      as="button"
      title="Show more information"
      type="solid"
      name="question-mark-circle"
      tabindex="0"
      class="w-4 h-4 cursor-pointer"
      @click="show = !show"
    />
  </div>
  <slot name="help">
    <p v-show="show" class="text-xs text-gray-600">
      {{ help }}
    </p>
  </slot>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import Icon from '@/elements/icon/Icon.vue';

export default defineComponent({
  name: 'Help',
  components: { Icon },
  props: {
    help: String,
  },
  setup() {
    return {
      show: ref(false),
    };
  },
});
</script>
