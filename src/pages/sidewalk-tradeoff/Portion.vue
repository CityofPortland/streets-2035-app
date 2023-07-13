<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { SidewalkPortion } from '@/composables/sidewalk-tradeoff';
import Box from '@/elements/box/Box';
import Input from '@/elements/inputs/Input.vue';
import Message from '@/components/message/Message.vue';

const props = defineProps({
  label: { type: String },
  maxWidth: { type: Number },
  portion: {
    type: Object as () => SidewalkPortion,
    required: true,
  },
});

const emit = defineEmits(['changed']);

const width = ref(props.portion.standardWidth);

const issues = computed(() =>
  props.portion.issues.filter(
    (i) => width.value >= i.minWidth && width.value < i.maxWidth
  )
);

watch(width, (newWidth) => emit('changed', newWidth));
</script>
<template>
  <Box as="section">
    <header>
      <h3 class="font-bold">
        {{ label }}
      </h3>
      <label class="font-semibold">Typical uses</label>
      <p>{{ portion.comment }}</p>
    </header>
    <main class="row-auto flex flex-col gap-2">
      <dl class="flex flex-col gap-4">
        <div>
          <dt class="font-semibold">Standard width</dt>
          <dd class="grid grid-cols-2 gap-2">
            {{ portion.standardWidth }} feet
          </dd>
        </div>
        <div>
          <dt class="font-semibold">Alternative width</dt>
          <dd class="grid grid-cols-2 gap-2">
            <input
              type="range"
              id="width"
              name="width"
              min="0"
              :max="maxWidth"
              step="0.1"
              v-model.number="width"
            />
            <Input
              id="width"
              name="width"
              type="number"
              min="0"
              :max="maxWidth"
              step="0.1"
              v-model.number="width"
            />
          </dd>
        </div>
      </dl>
      <div class="space-y-2">
        <Message
          v-for="(issue, index) in issues"
          :key="index"
          icon="exclamation"
          color="tangerine"
          variant="light"
          :summary="issue.comment"
        />
        <Message
          v-if="!issues || !issues.length"
          icon="check"
          color="green"
          variant="light"
          summary="Meets standards"
        />
      </div>
    </main>
  </Box>
</template>
