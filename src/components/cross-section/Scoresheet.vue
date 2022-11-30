<script setup lang="ts">
import Help from '../street/Help.vue';
import Scorebox from './Scorebox.vue';
import Scorecard from '@/components/cross-section/Scorecard.vue';
import { CrossSection } from '@/composables/cross-section';
import { ref, watch } from 'vue';
import { PrioritySet } from './typings';

const props = defineProps({
  options: { type: Array as () => Array<CrossSection>, required: true },
  mainStreet: {
    type: Boolean,
    default: false,
  },
  priorities: {
    type: Object as () => PrioritySet,
    default: () => ({
      pedestrian: 'higher',
      bicycle: 'higher',
      transit: 'higher',
      freight: 'higher',
      traffic: 'higher',
    }),
  },
  showControls: {
    type: Boolean,
    default: true,
  },
});

// Get a ref copy of the options to manipulate
const options = ref([...props.options]);

// If we get a new set of options, replace the ref
watch(
  () => props.options,
  (value) => {
    options.value = value;
  }
);

const handleMove = (curr: number, desired: number) => {
  console.log(`Moving from ${curr} to ${desired}...`);
  if (desired >= 0 && desired < options.value.length) {
    options.value.splice(desired, 0, ...options.value.splice(curr, 1));
  }
};
</script>

<template>
  <section
    class="grid grid-flow-col gap-1 overflow-x-auto"
    :style="`
        grid-template-rows: repeat(${showControls ? 9 : 8}, auto);
        grid-template-columns: minmax(min-content, 14rem) repeat(${
          options.length
        }, minmax(10rem, 14rem) [col-start]);
      `"
  >
    <span class="py-2"></span>
    <div>
      <Help>
        <span class="py-2">Safety</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50"
          >
            <h3>Metric</h3>
            <p>
              Evaluates the need for additional design solutions to provide a
              safe cross section for all modes.
            </p>
            <h3>Scoring description</h3>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Two to three lanes</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Five lanes</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-8" /></dt>
                <dd>Four lanes</dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <div>
      <Help>
        <span class="py-2">Pedestrian</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50"
          >
            <h3>Mobility</h3>
            <h4>Metric</h4>
            <p>
              Evaluates the presence or absence of curb zone buffers from
              adjacent traffic.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Parking or bike lane</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Travel lane</dd>
              </div>
            </dl>
            <h3>Access</h3>
            <h4>Metric</h4>
            <p>
              Evaluates the ease of providing closely spaced marked pedestrian
              crossings.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Two to three lanes</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Five lanes</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-8" /></dt>
                <dd>Four lanes</dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <div>
      <Help>
        <span class="py-2">Greening</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50"
          >
            <h3>Metric</h3>
            <p>
              Typically located in furnishing zone, evaluates additional
              potential space for stormwater swales or trees.
            </p>
            <h3>Scoring description</h3>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Presence of median or curb zone</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>
                  No median or curb zone; greening occurs in furnishing zone
                </dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <div>
      <Help>
        <span class="py-2">Bicycle</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50"
          >
            <h3>Mobility</h3>
            <h4>Metric</h4>
            <p>
              Evaluates if the bicycle facility is appropriate for the speed and
              volume of roadway. PBOT has designated protected bike lanes as the
              preferred design on roadways where separation is called for.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Seven or more foot wide buffered or protected bike lane</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Less than seven foot wide bike lane</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-8" /></dt>
                <dd>No bike lane</dd>
              </div>
            </dl>
            <h3>Access</h3>
            <h4>Metric</h4>
            <p>
              Same as above, since the availability of space for a bike facility
              informs the ease of accessing destinations on a corridor.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Seven or more foot wide buffered or protected bike lane</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Less than seven foot wide bike lane</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-8" /></dt>
                <dd>No bike lane</dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <div>
      <Help>
        <span class="py-2">Transit</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50 grid grid-cols-1"
          >
            <h3>Mobility</h3>
            <h4>Metric</h4>
            <p>
              Evaluates ability to provide faster and more reliable transit.
            </p>
            <h4>Scoring description</h4>
            <p>
              Scoring is a function of the number of lanes (vehicle capacity)
              and the consistency of a cross section with transit priority
              treatments including BAT lanes and queue bypasses.
            </p>
            <h3>Access</h3>
            <h4>Metric</h4>
            <p>
              Evaluates potential challenges to providing buses access to the
              curb at bus stops.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>
                  <p>
                    Cross section is consistent with transit stopping in lane
                  </p>
                  <ul>
                    <li>On-street parking (curb extensions)</li>
                    <li>Parking protected bike lanes (floating bus stops)</li>
                    <li>No parking or bike lanes (bus stops in lane)</li>
                  </ul>
                </dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>
                  Cross section typically requires transit to pull out of lane
                  to access curb
                </dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <div>
      <Help>
        <span class="py-2">Freight</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50 grid grid-cols-1"
          >
            <h3>Mobility</h3>
            <h4>Metric</h4>
            <p>Evaluates potential delay to freight vehicles.</p>
            <h4>Scoring description</h4>
            <p>Scoring is based on the number of travel lanes.</p>
            <h3>Access</h3>
            <h4>Metric</h4>
            <p>
              Evaluates tradeoffs to curb access for goods loading/unloading and
              service operations.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Curbside access on both sides</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Curbside access on one side</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-8" /></dt>
                <dd>No curbside access</dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <div>
      <Help>
        <span class="py-2">Traffic</span>
        <template v-slot:help="{ show }">
          <div
            v-show="show"
            class="prose absolute bg-white p-4 rounded border border-current z-50 grid grid-cols-1"
          >
            <h3>Mobility</h3>
            <h4>Metric</h4>
            <p>
              Evaluates tradeoffs to vehicular capacity to support turning
              volumes and minimize diversion onto local streets.
            </p>
            <h4>Scoring description</h4>
            <p>Scoring is based on the number of travel lanes.</p>
            <h3>Access</h3>
            <h4>Metric</h4>
            <p>
              Evaluates tradeoffs to motorized traffic access to adjacent land
              uses.
            </p>
            <h4>Scoring description</h4>
            <dl>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-8" /></dt>
                <dd>Curbside access on both sides</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-8" /></dt>
                <dd>Curbside access on one side</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-8" /></dt>
                <dd>No curbside access</dd>
              </div>
            </dl>
          </div>
        </template>
      </Help>
    </div>
    <span v-if="showControls"></span>
    <Scorecard
      v-for="(option, index) in options"
      :key="`${option.width}:${option.name}`"
      :scores="option"
      :main-street="mainStreet"
      :priorities="priorities"
      :show-controls="showControls"
      @move-left="handleMove(index, index - 1)"
      @move-right="handleMove(index, index + 1)"
    >
      <slot :option="option"></slot>
    </Scorecard>
  </section>
</template>
