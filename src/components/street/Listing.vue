<template>
  <router-link
    :to="street.id"
    append
    @mouseenter="handleHighlight()"
    @focus="handleHighlight()"
    class="
      flex flex-col
      gap-1
      p-2
      rounded-lg
      shadow
      ring-1 ring-black ring-opacity-50
      cursor-pointer
      hover:bg-blue-100 hover:ring-4 hover:ring-blue-300
      focus:bg-blue-100 focus:ring-4 focus:ring-blue-300
    "
  >
    <h3 class="text-lg font-bold leading-tight">
      {{ street.name.trim() || 'Unnamed segment' }}
    </h3>
    <div v-if="street.block" class="text-gray-700 font-semibold">
      {{ street.block }} block
    </div>
    <div class="flex flex-wrap gap-1">
      <Box
        v-for="(classification, index) in classificationKeys"
        :key="index"
        as="span"
        color="gray"
        variant="light"
        class="inline-flex px-1 text-xs ring-1 ring-black rounded"
      >
        {{
          classificationLabel(
            classification,
            street.classifications[classification]
          )
        }}
      </Box>
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';

import { debounce } from 'lodash';

import Box from '@/elements/box/Box';
import { Street } from './street';
import { useStreetClassification } from './use-street-classification';

export default defineComponent({
  name: 'StreetListing',
  components: { Box },
  props: {
    street: {
      type: Object as () => Street,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { street } = toRefs(props);
    const { classificationKeys, classificationLabel } =
      useStreetClassification(street);
    return {
      handleHighlight: debounce(
        () => {
          emit('highlight', props.street);
        },
        500,
        { leading: true, trailing: false }
      ),
      classificationLabel,
      classificationKeys,
    };
  },
});
</script>
