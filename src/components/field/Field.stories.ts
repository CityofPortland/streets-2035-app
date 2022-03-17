import { Meta, Story } from '@storybook/vue3';

import Component from './Field.vue';
import FieldList from './FieldList.vue';

export default {
  title: 'Component/Field',
  component: Component,
  argTypes: {
    number: {
      control: {
        type: 'number',
      },
    },
    display: {
      options: ['inline', 'above', 'hidden'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component, FieldList },
  setup: () => {
    return { ...args };
  },
  template: `<FieldList><Component v-for="i in number" :name="name" :display="display">{{ value }}</Component></FieldList>`,
});

export const Field = Template.bind({});
Field.args = {
  number: 1,
  name: 'Field',
  display: 'inline',
  value: 'Value',
};
