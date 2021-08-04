<template>
  <div class="flex flex-col space-y-4">
    <div class="flex flex-col">
      <div class="h-32" :class="[`bg-${color}-500`]"></div>
      <div class="flex flex-row">
        <span
          v-for="(weight, index) in weights"
          :key="index"
          class="w-full h-8"
          :class="[`bg-${color}-${weight}`]"
        ></span>
      </div>
    </div>
    <ul class="list-none flex flex-col space-y-3">
      <li
        v-for="(bgWeight, index) in weights"
        :key="index"
        class="flex flex-col"
      >
        <dl class="flex flex-row space-x-4 text-xl">
          <dt class="font-semibold">Weight:</dt>
          <dd>{{ bgWeight }}</dd>

          <dt class="font-semibold">Hex:</dt>
          <dd>{{ colorValue(color, bgWeight) }}</dd>

          <dt class="font-semibold">HSL:</dt>
          <dd>{{ hslText(color, bgWeight) }}</dd>
        </dl>
        <div
          class="rounded-lg flex flex-row flex-wrap space-x-4 p-4"
          :class="[`bg-${color}-${bgWeight}`]"
        >
          <div
            v-for="(textWeight, index) in weights"
            :key="index"
            class="p-4 flex flex-row space-x-1"
            :class="`text-${color}-${textWeight}`"
          >
            <div class="flex flex-row space-x-2">
              <div
                class="flex flex-col items-center justify-between"
                style="font-size: 18px"
              >
                <span>{{ textWeight }}</span>
                <span
                  v-if="contrast(color, bgWeight, textWeight) < 3"
                  class="
                    px-2
                    bg-red-600
                    text-white text-base
                    font-medium
                    rounded-lg
                  "
                  >Fail
                </span>
                <span
                  v-else
                  class="
                    px-2
                    bg-black
                    text-white text-base
                    font-medium
                    rounded-lg
                  "
                  >{{
                    contrast(color, bgWeight, textWeight) > 4.5 ? 'AAA' : 'AA'
                  }}
                </span>
              </div>
              <div
                class="flex flex-col items-center justify-between"
                style="font-size: 16px"
              >
                <span>{{ textWeight }}</span>
                <span
                  v-if="contrast(color, bgWeight, textWeight) < 4.5"
                  class="
                    px-2
                    bg-red-600
                    text-white text-base
                    font-medium
                    rounded-lg
                  "
                  >Fail
                </span>
                <span
                  v-else
                  class="
                    px-2
                    bg-black
                    text-white text-base
                    font-medium
                    rounded-lg
                  "
                  >{{
                    contrast(color, bgWeight, textWeight) > 7 ? 'AAA' : 'AA'
                  }}
                </span>
              </div>
              <div
                class="flex flex-col items-center justify-between"
                style="font-size: 14px; font-weight: bold"
              >
                <span>{{ textWeight }}</span>
                <span
                  v-if="contrast(color, bgWeight, textWeight) < 4.5"
                  class="
                    px-2
                    bg-red-600
                    text-white text-base
                    font-medium
                    rounded-lg
                  "
                  >Fail
                </span>
                <span
                  v-else
                  class="
                    px-2
                    bg-black
                    text-white text-base
                    font-medium
                    rounded-lg
                  "
                  >{{
                    contrast(color, bgWeight, textWeight) > 7 ? 'AAA' : 'AA'
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Color from 'color';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

export default defineComponent({
  name: 'ColorPalette',
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    };
  },
  methods: {
    colorValue(color, weight) {
      return fullConfig.theme.colors[color][weight];
    },
    hslText(color, weight) {
      const c = Color(fullConfig.theme.colors[color][weight]).hsl().array();
      return `${c[0].toPrecision(3)}°, ${c[1].toPrecision(
        3
      )}%, ${c[2].toPrecision(3)}%`;
    },
    contrast(color, bgWeight, textWeight) {
      const bg = Color(fullConfig.theme.colors[color][bgWeight]);
      const text = Color(fullConfig.theme.colors[color][textWeight]);
      return text.contrast(bg);
    },
  },
});
</script>
