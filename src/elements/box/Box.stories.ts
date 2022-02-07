import { Story } from '@storybook/vue3';

import Box from './Box';

export const ColorArgs = {
  color: {
    options: [
      'blue',
      'cyan',
      'gray',
      'green',
      'orange',
      'red',
      'tangerine',
      'transparent',
    ],
    control: {
      type: 'select',
    },
  },
  variant: {
    options: ['light', 'neutral', 'dark'],
    description:
      'Three different color theme variants for the chosen color theme. All variants are WCAG AA accessible at minimum.',
    control: {
      type: 'select',
    },
  },
};

export const Basic: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Box },
  setup() {
    return { ...args };
  },
  template: `<Box :as="as" :color="color" :variant="variant" :class="classes">This is a box.</Box>`,
});
Basic.args = {
  as: 'div',
  classes: '',
  color: 'transparent',
  variant: 'neutral',
};
