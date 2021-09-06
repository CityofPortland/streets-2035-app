import { ref } from 'vue';
import { ColorArgs } from '@/elements/box/Box.stories';
import { IconArgs } from '@/elements/icon/Icon.stories';
import { Story } from '@storybook/vue3';

import Toggle from '@/elements/inputs/Toggle.vue';

import Component from './Panel.vue';

export default {
  title: 'Component/Panel',
  component: Component,
  argTypes: {
    ...ColorArgs,
    icon: IconArgs.type,
    onToggle: { action: 'toggle' },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component, Toggle },
  setup: () => {
    const toggleModel = ref(true);

    return {
      ...args,
      toggleModel,
      handleToggle() {
        toggleModel.value = !toggleModel.value;
      },
    };
  },
  template: `
    <Component
        :icon="icon"
        :color="color"
        :variant="variant"
        :open="open"
        :name="name"
        @toggle="onToggle">
        <form @submit.prevent>
            <Toggle id="toggle" label="Some field" :modelValue="toggleModel" @update:modelValue="handleToggle" />
        </form>
    </Component>`,
});

export const Panel = Template.bind({});
Panel.args = {
  color: 'gray',
  variant: 'light',
  icon: 'cog',
  name: 'Settings',
  open: true,
};
