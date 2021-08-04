import { Story } from '@storybook/vue3';

import Component from './Icon.vue';
import icons from './icons';

export const IconArgs = {
  type: {
    control: {
      type: 'select',
      options: Object.keys(icons),
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  template: `<Component v-bind="$props" class="h-12 w-12" />`,
});

export const Basic = Template.bind({});
Basic.args = {
  type: 'check-circle',
};
