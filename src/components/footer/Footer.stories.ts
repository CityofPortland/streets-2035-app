import { Story } from '@storybook/vue3';

import Box from '@/elements/box/Box';
import Footer from './Footer.vue';
import { ColorArgs } from '@/elements/box/Box.stories';

export default {
  title: 'Component/Footer',
  component: Footer,
  argTypes: {
    ...ColorArgs,
  },
};

export const Default: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Footer },
  setup: () => {
    return { ...args };
  },
  template: `<Footer :color="color" />`,
});
Default.args = {};

export const Skeleton: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Box, Footer },
  setup: () => {
    return { ...args };
  },
  template: `<Footer :color="color">
      <template v-slot:top><Box class="h-full w-full flex flex-col items-center justify-center p-6 border border-current rounded-md">Top</Box></template>
      <template v-slot:middle><Box class="h-full w-full flex flex-col items-center justify-center p-6 border border-current rounded-md">Middle</Box></template>
      <template v-slot:bottom><Box class="h-full w-full flex flex-col items-center justify-center p-6 border border-current rounded-md">Bottom</Box></template>
    </Footer>`,
});
Skeleton.args = {};
