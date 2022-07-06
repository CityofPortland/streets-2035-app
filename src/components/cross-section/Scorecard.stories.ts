import { Story } from '@storybook/vue3';

import Box from '@/elements/box/Box';
import Component from './Scorecard.vue';

export default {
  title: 'Component/Scorecard',
  component: Component,
  argTypes: {
    name: {
      control: {
        type: 'string',
      },
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Box, Component },
  setup: () => {
    return { ...args };
  },
  template: `<Component :name="name" :scores="scores">
      <Box color="gray" variant="light" class="flex items-center justify-center h-48 border border-current rounded-md">Image here</Box>
    </Component>`,
});

export const Scorecard = Template.bind({});
Scorecard.args = {
  name: 'Option A',
  scores: {
    safety: 3,
    'pedestrian:mobility': 2,
    'pedestrian:access': 3,
    greening: 1,
    'bicycle:mobility': 3,
    'bicycle:access': 2,
    'transit:mobility': 2,
    'transit:access': 1,
  },
};
