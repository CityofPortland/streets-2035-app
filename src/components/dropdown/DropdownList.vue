<template>
  <Box
    as="div"
    role="menu"
    tabindex="-1"
    aria-orientation="vertical"
    :aria-labelledby="id"
    :class="{ hidden: !open }"
  >
    <div class="p-1 w-full" role="none">
      <slot></slot>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Box from '@/elements/box/Box';

export default defineComponent({
  name: 'DropdownList',
  components: { Box },
  props: {
    as: {
      type: String,
      default: 'span',
    },
    id: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
