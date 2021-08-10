import { Story, Meta } from '@storybook/vue3';

import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import { ButtonProps } from '@/elements/button/Button.types';
import { BoxProps } from '@/elements/box/Box';
import { ColorArgs } from '@/elements/box/Box.stories';

export default {
  title: 'Component/Dropdown',
  component: Dropdown,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    onClick: { action: 'clicked' },
    ...ColorArgs,
  },
  decorators: [
    () => ({ template: '<div class="flex justify-center"><story/></div>' }),
  ],
  subcomponents: { DropdownItem },
} as Meta;

const Template: Story<ButtonProps & BoxProps> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropdown, DropdownItem },
  setup() {
    return { ...args };
  },
  template: `<Dropdown @click="onClick" :color="color" :variant="variant" :size="size" :label="label">
        <template v-slot:menu>
            <DropdownItem>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Item 1</a>
            </DropdownItem>
        </template>
    </Dropdown>`,
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
