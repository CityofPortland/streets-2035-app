<template>
  <li>
    <Anchor v-if="isExternalLink" v-bind="$attrs" :url="to">
      <slot :url="url" :display="display">{{ display }}</slot>
    </Anchor>
    <RouterLink v-else custom :to="to" v-slot="{ href, navigate }">
      <Anchor v-bind="$attrs" :url="href" @click="navigate">
        <slot :url="url" :display="display">{{ display }}</slot>
      </Anchor>
    </RouterLink>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Anchor from '@/elements/anchor/Anchor.vue';

export default defineComponent({
  name: 'NavItem',
  components: { Anchor },
  inheritAttrs: false,
  props: {
    to: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  setup(props) {
    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.match(/^(http(s)?:)?\/\//)
    );

    return {
      display: props.text || props.url,
      isExternalLink,
    };
  },
});
</script>
