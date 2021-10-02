import { Ref, ref } from 'vue';

import { Story, Meta } from '@storybook/vue3';

import Component from './AddressSuggest.vue';
import Candidate from './Candidate.vue';
import { Candidate as ICandidate } from './candidate';
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
    const candidates: Ref<Array<ICandidate>> = ref([
      {
        id: null,
        type: 'property',
        name: '3575 SE DIVISION ST',
        location: {
          x: -13650743.556,
          y: 5701378.213,
          spatialReference: { wkid: 102100, latestWkid: 3857 },
        },
        city: 'PORTLAND',
        state: 'OR',
      } as ICandidate,
      {
        type: 'address',
        name: '1234 NE MAIN ST',
        city: 'PORTLAND',
        state: 'OR',
      } as ICandidate,
      {
        type: 'intersection',
        name: 'NE MAIN ST & 12TH AVE',
        city: 'PORTLAND',
        state: 'OR',
      } as ICandidate,
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
