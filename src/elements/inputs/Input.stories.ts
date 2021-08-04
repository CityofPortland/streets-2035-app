import { Meta, Story } from '@storybook/vue3';

import Component from './Input.vue';

export default {
  title: 'Element/Inputs/TextInput',
  component: Component,
  argTypes: {
    onInput: { action: 'input' },
    onKeypress: { action: 'keypress' },
  },
} as Meta;

const Basic: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup() {
    return {
      ...args,
    };
  },
  template: `<Component
      :id="id"
      :name="name"
      :type="type"
      :required="required"
      :pattern="pattern"
      :pattern-modifiers="patternModifiers"
      :size="size"
      :placeholder="placeholder"
      :model-value="value"
      :model-modifiers="modelModifiers"
      @keypress="onKeypress"
      @update:model-value="onInput" />`,
});

export const Input = Basic.bind({});
Input.args = {
  id: 'input',
  name: 'input',
  type: 'text',
  required: false,
  placeholder: 'Fill me...',
  modelValue: undefined,
};
