import { ColorArgs } from '@/elements/box/Box.stories';
import { IconArgs } from '@/elements/icon/Icon.stories';
import { Story } from '@storybook/vue3';

import Component from './Message.vue';

export default {
  title: 'Component/Message',
  component: Component,
  argTypes: {
    ...ColorArgs,
    icon: IconArgs.type,
    summary: {
      control: {
        type: 'text',
      },
    },
    message: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup: () => {
    return { ...args };
  },
  template: `<Component :icon="icon" :color="color" :variant="variant" :summary="summary"><p>{{message}}</p></Component>`,
});

export const Message = Template.bind({});
Message.args = {};
