import { Meta, Story } from '@storybook/vue3';

import Component from './Toggle.vue';

export default {
  title: 'Element/Inputs/Toggle',
  component: Component,
  argTypes: {
    onUpdate: { action: 'update' },
  },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup() {
    return {
      ...args,
    };
  },
  template: `<Component
      :id="id"
      :label="label"
      :modelValue="modelValue"
      @update:modelValue="onUpdate" />`,
});

export const Toggle = Template.bind({});
Toggle.args = {
  id: 'input',
  label: 'Toggle',
  modelValue: false,
};
