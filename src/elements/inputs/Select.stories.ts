import { Meta, Story } from '@storybook/vue3';

import Component from './Select.vue';

export default {
  title: 'Element/Inputs/Select',
  component: Component,
  argTypes: {
    onUpdate: { action: 'update' },
  },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup() {
    return { ...args, onUpdate: (input: string) => (args.modelValue = input) };
  },
  template: `<Component
      :id="id"
      :name="name"
      :required="required"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @update:modelValue="onUpdate">
        <option value="1">First option</option>
      </Component>`,
});

export const Select = Template.bind({});
Select.args = {
  id: 'input',
  name: 'input',
  required: false,
  placeholder: 'Select me...',
  modelValue: undefined,
};
