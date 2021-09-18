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
  name: {
    control: {
      type: 'select',
      options: Object.keys(icons.outline),
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup() {
    return {
      ...args,
    };
  },
  template: `<Component :type="type" :name="name" class="h-12 w-12" />`,
});

export const Basic = Template.bind({});
Basic.args = {
  name: 'check-circle',
};
