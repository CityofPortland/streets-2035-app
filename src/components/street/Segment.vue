<template>
  <Box
    @mouseenter="handleHighlight"
    @focus="handleHighlight"
    class="p-2 border-current grid grid-cols-2 gap-2 hover:bg-blue-100 focus:bg-blue-100"
  >
    <FieldList class="gap-1">
      <Field display="above" name="Block">
        <span v-if="block">{{ block }}</span>
        <div v-else>
          <Help
            help="We may display unknown values because this segment has no associated postal addresses."
          >
            <span>Unknown</span>
          </Help>
        </div>
      </Field>
      <Field display="above" name="Road width">
        <span v-if="width">{{ width }} feet</span>
        <div v-else>
          <Help
            help="We may display unknown values because the City of Portland
                    does not manage this specific street segment."
          >
            <span>Unknown</span>
          </Help>
        </div>
      </Field>
    </FieldList>
    <div class="flex flex-col justify-center gap-3 flex-wrap">
      <div v-if="crossSectionRoute">
        <router-link
          :to="crossSectionRoute"
          class="border-b-2 border-current text-sm font-medium"
          >View cross sections</router-link
        >
      </div>
      <div>
        <router-link
          :to="`/streets/${id}`"
          class="border-b-2 border-current text-sm font-medium"
          >View segment details</router-link
        >
      </div>
    </div>
  </Box>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';

import Box from '@/elements/box/Box';
import Field from '@/components/field/Field.vue';
import FieldList from '@/components/field/FieldList.vue';
import Help from './Help.vue';
import { Street } from '@/composables/use-street';
import { useStreetClassification } from '@/composables/use-street-classification';
import { useCrossSection } from '@/composables/cross-section';

export default defineComponent({
  name: 'StreetListing',
  components: { Box, Field, FieldList, Help },
  props: {
    street: {
      type: Object as () => Street,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { street } = toRefs(props);
    const { id, block, width } = street.value;
    const { crossSectionRoute } = useCrossSection(street);
    const { classificationKeys, classificationLabel } =
      useStreetClassification(street);
    return {
      id,
      block,
      width,
      crossSectionRoute,
      handleHighlight: () => emit('highlight', props.street),
      classificationLabel,
      classificationKeys,
    };
  },
});
</script>
