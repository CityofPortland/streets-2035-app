import { Story } from '@storybook/vue3';

import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Icon from '@/elements/icon/Icon.vue';

export const Slots: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Anchor, Box },
  template: `<Anchor url="#">
    <template v-slot:before>
        <Box as="span" class="p-1 border border-current rounded-md">Before</Box>
    </template>This is the default slot<template
        v-slot:after>
        <Box as="span" class="p-1 border border-current rounded-md">After</Box>
    </template>
  </Anchor>`,
});

export const SlotsWithIcons: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Anchor, Icon },
  template: `<Anchor url="#">
      <template v-slot:before>
          <Icon type="check-circle" class="h-4 w-4 inline" />
      </template>This is the default slot<template
          v-slot:after>
          <Icon type="check-circle" class="h-4 w-4 inline" />
      </template>
    </Anchor>`,
});
