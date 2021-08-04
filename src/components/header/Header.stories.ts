import { Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import Logo from '@/assets/Logo.vue';
import Button from '@/elements/button/Button.vue';
import Header from './Header.vue';
import Nav from '../nav/Nav.vue';
import NavItem from '../nav/NavItem.vue';
import { ColorArgs } from '@/elements/box/Box.stories';

export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    appName: { control: { type: 'text', default: 'PBOT App' } },
    onToggle: { action: 'toggled' },
    ...ColorArgs,
  },
};

const Branding = defineComponent({
  props: ['appName'],
  components: { Logo },
  template: `<div class="flex items-center truncate">
    <Logo class="w-16 mr-3" />
    <h1 class="truncate">{{ appName }}</h1>
  </div>`,
});

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header, Logo, Button, Nav, NavItem },
  setup: () => {
    return { ...args };
  },
  template: `<Header :color="color" :variant="variant" :open="open" @toggle="onToggle">
      <template v-slot:branding>
        <Logo class="w-20 mr-3 hidden md:inline-flex" />
        <h1 class="truncate text-xl">{{ appName }}</h1>
      </template>
      <template v-slot:menu>
        <Nav class="grid grid-cols-1 gap-3 md:flex md:flex-row md:gap-0 md:space-x-3 md:items-center">
          <NavItem url="#" text="Home"></NavItem>
          <NavItem url="#" text="News"></NavItem>
          <NavItem url="#" text="Events"></NavItem>
        </Nav>
        <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 py-2 md:p-0 md:ml-auto">
          <Button label="Log in" size="small" primary>Log in</Button>
        </div>
      </template>
    </Header>`,
});

export const Basic = Template.bind({});
Basic.args = {
  appName: 'Transportation App',
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  appName: 'Transportation App With a Name That is Too Long',
};

const NoMenuTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header, Branding },
  setup: () => {
    return { ...args };
  },
  template: `<Header :color="color" :variant="variant">
      <template v-slot:branding>
        <Logo class="w-20 mr-3 hidden md:inline-flex" />
        <h1 class="truncate text-xl">{{ appName }}</h1>
      </template>
    </Header>`,
});

export const NoMenu = NoMenuTemplate.bind({});
NoMenu.args = {
  appName: 'Transportation App',
};
