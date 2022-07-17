<template>
  <article class="mb-8">
    <Box as="header" color="blue" class="min-h-96 px-4 py-24">
      <Box class="h-full max-w-7xl mx-auto flex items-center justify-start">
        <Box
          color="blue"
          variant="dark"
          class="p-8 transform skew-y-1 skew-x-1"
        >
          <div class="transform -skew-y-1 -skew-x-1 prose-lg">
            <h1 class="text-4xl font-bold">
              Welcome to
              <abbr title="Portland Bureau of Transportation">PBOT's</abbr>
              Streets 2035 design app!
            </h1>
            <p>
              Streets 2035 is a tool for capital and development projects that
              uses a framework for gathering relevant information at the
              beginning of a project. It systematically works through tradeoffs,
              impacts, and outcomes in a consistent manner
            </p>
            <div
              class="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <router-link to="/streets" class="flex">
                <Button as="span" color="orange" size="large"
                  >Check out the streets</Button
                >
              </router-link>
              <router-link to="/street-types" class="flex">
                <Button as="span" golor="gray" variant="light" size="large"
                  >Read about street types</Button
                >
              </router-link>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import Box from '@/elements/box/Box';
import Button from '@/elements/button/Button.vue';

import { useHeaderStore } from '@/store/header';

export default defineComponent({
  name: 'Home',
  components: {
    Box,
    Button,
  },
  setup() {
    onBeforeRouteLeave(() => {
      const store = useHeaderStore();
      store.setHeader({ color: 'transparent' });
    });
  },
  beforeRouteEnter(_to, _from, next) {
    next(() => {
      const store = useHeaderStore();
      store.setHeader({ color: 'blue' });
    });
  },
});
</script>
