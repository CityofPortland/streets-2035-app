import { Ref, ref } from 'vue';

import { Story, Meta } from '@storybook/vue3';

import Component from './AddressSuggest.vue';
import Candidate from './Candidate.vue';
import { Candidate as ICandidate } from './candidate';
import CandidateList from './CandidateList.vue';

export default {
  title: 'Component/Address Suggest',
  component: Component,
  argTypes: {},
  subcomponents: { Candidate, CandidateList },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddressSuggest: Component, Candidate, CandidateList },
  setup() {
    const candidates: Ref<Array<ICandidate>> = ref([
      {
        type: 'address',
        name: '1234 NE Main St.',
        city: 'Portland',
        state: 'OR',
      } as ICandidate,
      {
        type: 'address',
        name: '1235 NE Main St.',
        city: 'Portland',
        state: 'OR',
      } as ICandidate,
    ]);
    const showCandidates = ref(false);

    return {
      ...args,
      candidates,
      showCandidates,
      handleSearch() {
        showCandidates.value = true;
        return;
      },
      handleSelect(candidate) {
        showCandidates.value = false;
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
