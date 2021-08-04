import { Story, Meta } from '@storybook/vue3';

import Button from './Button.vue';
import { ButtonProps } from '@/elements/button/Button.types';
import { BoxProps } from '@/elements/box/Box';
import { ColorArgs } from '@/elements/box/Box.stories';

export default {
  title: 'Element/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    onClick: { action: 'clicked' },
    ...ColorArgs,
  },
} as Meta;

const Template: Story<ButtonProps & BoxProps> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  setup() {
    return { ...args };
  },
  template:
    '<Button @click="onClick" :color="color" :variant="variant" :size="size" :label="label" />',
});

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
