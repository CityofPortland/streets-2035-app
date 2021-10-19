import { Story } from '@storybook/vue3';

import PagerVue from './Pager.vue';

export default {
  title: 'Component/Pager',
  component: PagerVue,
  argTypes: {
    onChange: {
      type: 'action',
    },
  },
};

const items = [
  {
    name: 'Item 1',
    value: 1,
  },
  {
    name: 'Item 2',
    value: 2,
  },
];

export const Pager: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Pager: PagerVue },
  setup: () => {
    return { ...args };
  },
  template: `<Pager :list="items" :value="value" @change="onChange" />`,
});
Pager.args = {
  items,
  value: 0,
};
