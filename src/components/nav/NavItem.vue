<template>
  <li>
    <Anchor v-if="isExternalLink" v-bind="$attrs" :url="to">
      <slot :url="url" :display="display">{{ display }}</slot>
    </Anchor>
    <router-link v-else v-bind="$props" custom v-slot="{ href, navigate }">
      <Anchor v-bind="$attrs" :url="href" @click="navigate">
        <slot :url="url" :display="display">{{ display }}</slot>
      </Anchor>
    </router-link>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

import Anchor from '@/elements/anchor/Anchor.vue';

export default defineComponent({
  name: 'NavItem',
  components: { Anchor },
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ...RouterLink.props,
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
