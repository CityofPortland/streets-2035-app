import { Ref, ref } from 'vue';

import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import { Story, Meta } from '@storybook/vue3';

import Component from './AddressSuggest.vue';
import Candidate from './Candidate.vue';
import { Candidate as TCandidate, CandidateType } from './candidate';
import CandidateList from './CandidateList.vue';

export default {
  title: 'Component/Address Suggest',
  component: Component,
  argTypes: {
    onSearch: {
      action: 'search',
    },
    onSelect: {
      action: 'select',
    },
  },
  subcomponents: { Candidate, CandidateList },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddressSuggest: Component, Candidate, CandidateList },
  setup() {
    const candidates: Ref<Array<Partial<TCandidate>>> = ref([
      {
        id: null,
        type: 'property' as CandidateType,
        name: '3575 SE DIVISION ST',
        city: 'PORTLAND',
        state: 'OR',
      },
      {
        type: 'address' as CandidateType,
        name: '1234 NE MAIN ST',
        city: 'PORTLAND',
        state: 'OR',
      },
      {
        type: 'intersection' as CandidateType,
        name: 'NE MAIN ST & 12TH AVE',
        city: 'PORTLAND',
        state: 'OR',
      },
    ]);
    const showCandidates = ref(false);

    return {
      ...args,
      candidates,
      showCandidates,
      handleSearch(search: unknown) {
        showCandidates.value = true;
        args.onSearch(search);
        return;
      },
      handleSelect(candidate: unknown) {
        showCandidates.value = false;
        args.onSelect(candidate);
        return candidate;
      },
    };
  },
  template: `
  <AddressSuggest @search="handleSearch" />
  <CandidateList :open="showCandidates" class="mt-3 max-w-xs">
    <Candidate
      v-for="(c, index) in candidates"
      :key="index"
      :candidate="c"
      class="my-1"
      @click="handleSelect(c)"
      @keyup.enter="handleSelect(c)"
      @keyup.space="handleSelect(c)"
    />
  </CandidateList>
  `,
});

export const AddressSuggest = Template.bind({});
AddressSuggest.args = {};
