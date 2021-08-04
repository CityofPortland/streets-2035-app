import { Story } from '@storybook/vue3';

import Component from './Copyright.vue';

export default {
  title: 'Component/Copyright',
  component: Component,
  argTypes: {
    startDate: {
      control: {
        type: 'date',
      },
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup: () => {
    return { startDate: new Date(args.startDate) };
  },
  template: `<Component :startDate="startDate" />`,
});

export const Copyright = Template.bind({});
Copyright.args = {};
