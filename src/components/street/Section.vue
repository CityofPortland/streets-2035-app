<template>
  <Box
    :as="as"
    tabindex="0"
    @mouseenter="handleHighlightSection(street)"
    @focus="handleHighlightSection(street)"
    class="flex flex-col gap-3 p-2 border border-current shadow-md rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    <h3 class="text-lg font-bold leading-tight">
      {{ street.name?.trim() || 'Unnamed segment' }}
    </h3>
    <div v-if="classificationKeys.length" class="flex flex-wrap gap-1">
      <Box
        v-for="(classification, index) in classificationKeys"
        :key="index"
        as="span"
        color="gray"
        variant="light"
        class="inline-flex px-2 py-0.5 text-xs uppercase border border-current rounded-full"
      >
        {{
          classificationLabel(
            classification,
            street.classifications[classification]
          )
        }}
      </Box>
    </div>
    <FieldList v-if="street.minWidth || street.maxWidth" class="gap-1 text-sm">
      <Field display="inline" name="Road width">
        <div v-if="!street.minWidth && !street.maxWidth">
          <Help
            help="We may display unknown values because the City of Portland
                    does not manage this specific street section."
          >
            <span>Unknown</span>
          </Help>
        </div>
        <span
          class="mt-0 col-span-2"
          v-else-if="street.minWidth != street.maxWidth"
        >
          {{ street.minWidth }} to {{ street.maxWidth }} feet
        </span>
        <span
          class="mt-0 col-span-2"
          v-else-if="street.minWidth == street.maxWidth"
        >
          {{ street.minWidth }} feet
        </span>
      </Field>
    </FieldList>
    <Panel
      v-if="street.segments && street.segments.length"
      color="fog"
      variant="light"
      class="text-sm"
      :open="showSegments"
      @toggle="showSegments = !showSegments"
    >
      <template v-slot:header>
        <div class="flex gap-1 items-center">
          <span>Segments</span>
          <Box color="blue" class="px-1 text-xs rounded-lg">{{
            street.segments.length
          }}</Box>
        </div>
      </template>
      <ul class="grid grid-cols-1">
        <Segment
          as="li"
          tabindex="0"
          v-for="(segment, index) in street.segments"
          :key="segment.id"
          :street="segment"
          @highlight="handleHighlightSegment"
          :class="{
            'border-t': index > 0,
            'rounded-b-md': index == street.segments.length - 1,
          }"
        />
      </ul>
    </Panel>
  </Box>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';

import { debounce } from 'lodash';

import Box from '@/elements/box/Box';
import Field from '@/components/field/Field.vue';
import FieldList from '@/components/field/FieldList.vue';
import Help from './Help.vue';
import Panel from '@/components/panel/Panel.vue';
import Segment from '@/components/street/Segment.vue';
import { Street, StreetSection } from '@/composables/use-street';
import { useStreetClassification } from '@/composables/use-street-classification';

export default defineComponent({
  name: 'StreetSection',
  components: { Box, Field, FieldList, Help, Panel, Segment },
  props: {
    as: {
      type: String,
      default: 'div',
    },
    street: {
      type: Object as () => StreetSection,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { street } = toRefs(props);
    const { classificationKeys, classificationLabel } =
      useStreetClassification(street);
    const showSegments = ref(false);

    return {
      showSegments,
      handleHighlightSection: debounce(
        (section: StreetSection) => {
          emit('highlightSection', section);
        },
        300,
        { leading: false, trailing: true }
      ),
      handleHighlightSegment: debounce(
        (segment: Street) => {
          emit('highlightSegment', segment);
        },
        300,
        { leading: false, trailing: true }
      ),
      classificationLabel,
      classificationKeys,
    };
  },
});
</script>
