<template>
  <div ref="componentRef">
    <section class="flex items-center gap-2">
      <slot></slot>
      <button type="button" title="Show more information" @click.stop="toggle">
        <Icon type="solid" name="question-mark-circle" class="w-4 h-4" />
      </button>
    </section>
    <slot name="help" :help="help" :show="show">
      <p v-show="show" class="text-xs text-gray-600">
        {{ help }}
      </p>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import Icon from '@/elements/icon/Icon.vue';
import { useWindowEvent } from '@/composables/useWindowEvent';

export default defineComponent({
  name: 'Help',
  components: { Icon },
  props: {
    help: String,
  },
  setup() {
    const componentRef: Ref<HTMLElement | null> = ref(null);
    const show = ref(false);

    const listener = (event: Event) => {
      const target = event.target as HTMLElement;

      if (!show.value) return;

      if (componentRef.value && componentRef.value.contains(target)) return;

      show.value = false;
    };

    const toggle = () => {
      show.value = !show.value;
    };

    useWindowEvent('focusin', listener);
    useWindowEvent('mousedown', listener);

    return {
      componentRef,
      show,
      toggle,
    };
  },
});
</script>
