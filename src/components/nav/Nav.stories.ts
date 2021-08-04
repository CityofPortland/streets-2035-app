import { Meta, Story } from '@storybook/vue3';

import Nav from './Nav.vue';
import NavItem from './NavItem.vue';

export default {
  title: 'Component/Nav',
  component: Nav,
  subcomponents: { NavItem },
  argTypes: {
    navClasses: {
      control: { type: 'text' },
      description: 'Classes applied to the nav list',
    },
    navItemClasses: {
      control: {
        type: 'text',
      },
      description: 'Classes applied to each NavItem',
    },
  },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Nav, NavItem },
  setup: () => {
    return { ...args };
  },
  template: `<Nav :class="navClasses">
    <NavItem url="#" :class="navItemClasses" text="Home"></NavItem>
    <NavItem url="#" :class="navItemClasses" text="News"></NavItem>
    <NavItem url="#" :class="navItemClasses" text="Events"></NavItem>
    <NavItem url="#" :class="navItemClasses" text="Apps"></NavItem>
  </Nav>`,
});

export const Basic = Template.bind({});
Basic.args = {};

export const Header = Template.bind({});
Header.args = {
  navClasses: 'flex flex-col md:flex-row md:space-x-3',
};
