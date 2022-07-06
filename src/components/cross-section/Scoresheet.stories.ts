import { Story } from '@storybook/vue3';

import Component from './Scoresheet.vue';

export default {
  title: 'Component/Scoresheet',
  component: Component,
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup: () => {
    return { ...args };
  },
  template: `<Component :scores="scores" />`,
});

export const Scoresheet = Template.bind({});
Scoresheet.args = {
  scores: [
    {
      name: 'Option A',
      safety: 3,
      'pedestrian:mobility': 2,
      'pedestrian:access': 3,
      greening: 1,
      'bicycle:mobility': 3,
      'bicycle:access': 2,
      'transit:mobility': 2,
      'transit:access': 1,
    },
    {
      name: 'Option B',
      safety: 3,
      'pedestrian:mobility': 2,
      'pedestrian:access': 3,
      greening: 1,
      'bicycle:mobility': 3,
      'bicycle:access': 2,
      'transit:mobility': 2,
      'transit:access': 1,
    },
    {
      name: 'Option C',
      safety: 3,
      'pedestrian:mobility': 2,
      'pedestrian:access': 3,
      greening: 1,
      'bicycle:mobility': 3,
      'bicycle:access': 2,
      'transit:mobility': 2,
      'transit:access': 1,
    },
  ],
};
