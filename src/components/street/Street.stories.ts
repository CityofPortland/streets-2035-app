import { Story } from '@storybook/vue3';

import StreetFull from './Full.vue';
import StreetList from './Listing.vue';

export default {
  title: 'Component/Street',
  component: StreetFull,
  subcomponents: { StreetList },
  argTypes: {
    onHighlight: {
      type: 'action',
    },
  },
};

const street = {
  id: 'TP01-0012886',
  name: 'N INTERSTATE AVE',
  block: 100,
  width: 50,
  geometry: {
    type: 'LineString',
    coordinates: [
      [-122.68219912146073, 45.56632721401117],
      [-122.68218291495467, 45.56771770268728],
    ],
  },
  classifications: {
    design: 'CIMS',
    bicycle: 'CB',
    transit: 'RTMTP',
  },
};

export const Full: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Street: StreetFull },
  setup: () => {
    return { ...args };
  },
  template: `<Street :street="street" />`,
});
Full.args = {
  street,
};

export const List: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Street: StreetList },
  setup: () => {
    return { ...args };
  },
  template: `<div class="grid grid-cols-1 gap-2"><Street v-for="index in 3" :key="index" :street="street" @highlight="onHighlight" /></div>`,
});
List.args = {
  street,
};
