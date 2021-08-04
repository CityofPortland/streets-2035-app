import { Story } from '@storybook/vue3';

import Box from './Box';

export const ColorArgs = {
  color: {
    control: {
      type: 'select',
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
    },
  },
  variant: {
    description:
      'Three different color theme variants for the chosen color theme. All variants are WCAG AA accessible at minimum.',
    control: {
      type: 'select',
      options: ['light', 'neutral', 'dark'],
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Box },
  template: `<Box :as="as" :color="color" :variant="variant" :class="classes">This is a box.</Box>`,
});

export const Basic = Template.bind({});
Basic.args = {
  as: 'div',
  classes: '',
  color: 'transparent',
  variant: 'neutral',
};
