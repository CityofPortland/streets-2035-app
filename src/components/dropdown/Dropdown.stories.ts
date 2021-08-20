import { Story, Meta } from '@storybook/vue3';

import Anchor from '@/elements/anchor/Anchor.vue';
import { ButtonProps } from '@/elements/button/Button.types';
import { BoxProps } from '@/elements/box/Box';
import { ColorArgs } from '@/elements/box/Box.stories';
import Header from '@/components/header/Header.vue';

import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import DropdownList from './DropdownList.vue';

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
  subcomponents: { DropdownItem, DropdownList },
} as Meta;

const Template: Story<ButtonProps & BoxProps> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropdown, DropdownItem, DropdownList },
  setup() {
    return { ...args };
  },
  template: `<Dropdown :color="color" :variant="variant" :size="size" :label="label" id="menu-button">
        <template v-slot:menu="{ open, id }">
          <DropdownList
            :open="open"
            :id="id"
            class="
              origin-top-right
              absolute
              right-0
              mt-2
              w-64
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none">
            <DropdownItem>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Item 1</a>
            </DropdownItem>
          </DropdownList>
        </template>
    </Dropdown>`,
});

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button',
};
Medium.decorators = [
  () => ({ template: '<div class="flex justify-center"><story/></div>' }),
];

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};
Large.decorators = [
  () => ({ template: '<div class="flex justify-center"><story/></div>' }),
];

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
Small.decorators = [
  () => ({ template: '<div class="flex justify-center"><story/></div>' }),
];

export const InHeader: Story<ButtonProps & BoxProps> = (
  args,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { Anchor, Dropdown, DropdownItem, DropdownList, Header },
  setup() {
    return { ...args };
  },
  template: `<Header :open="true">
    <template #branding>
      <h1 class="truncate text-xl">Some App</h1>
    </template>
    <template #menu>
      <div class="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:space-x-2
        space-y-2
        md:space-y-0">
        <Dropdown
          :color="color"
          :variant="variant"
          :size="size"
          :label="label"
          id="menu-button"
          class="
            w-full
            md:w-auto
            justify-between
          ">
          <template v-slot:menu="{ open }">
            <DropdownList
              :open="open"
              class="
                md:origin-top-left
                md:absolute
                md:left-0
                md:w-64
                mt-1
                bg-white
                rounded
                border
                focus:outline-none">
              <DropdownItem>
                  <Anchor url="#" class="block px-4 py-2 rounded-md hover:bg-fog-500">Item 1</Anchor>
              </DropdownItem>
              <DropdownItem>
                  <Anchor url="#" class="block px-4 py-2 rounded-md hover:bg-fog-500">Item 2</Anchor>
              </DropdownItem>
              <DropdownItem>
                  <Anchor url="#" class="block px-4 py-2 rounded-md hover:bg-fog-500">Item 3</Anchor>
              </DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
        <Dropdown
          :color="color"
          :variant="variant"
          :size="size"
          :label="label"
          id="menu-button"
          class="
            w-full
            md:w-auto
            justify-between
          ">
          <template v-slot:menu="{ open }">
            <DropdownList
              :open="open"
              class="
                md:origin-top-left
                md:absolute
                md:left-0
                md:w-64
                mt-1
                bg-white
                rounded
                border
                focus:outline-none">
              <DropdownItem>
                  <Anchor url="#" class="block px-4 py-2 rounded-md hover:bg-fog-500">Item 1</Anchor>
              </DropdownItem>
              <DropdownItem>
                  <Anchor url="#" class="block px-4 py-2 rounded-md hover:bg-fog-500">Item 2</Anchor>
              </DropdownItem>
              <DropdownItem>
                  <Anchor url="#" class="block px-4 py-2 rounded-md hover:bg-fog-500">Item 3</Anchor>
              </DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
      </div>
    </template>
  </Header>`,
});
InHeader.args = {
  label: 'Menu',
};
