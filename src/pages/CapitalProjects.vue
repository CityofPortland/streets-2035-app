<script setup lang="ts">
import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import Legend from '@/components/cross-section/Legend.vue';
import Message from '@/components/message/Message.vue';
import Scorebox from '@/components/cross-section/Scorebox.vue';
import Scoresheet from '@/components/cross-section/Scoresheet.vue';
import { useCrossSection } from '@/composables/cross-section';
import { computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useHeaderStore } from '@/store/header';

const publicPath = process.env.BASE_URL;
const width = 50;

onBeforeRouteLeave(() => {
  const store = useHeaderStore();
  store.setHeader({ color: 'transparent' });
});

const store = useHeaderStore();
store.setHeader({ color: 'red' });

const options = computed(() => {
  const { options } = useCrossSection(ref({ width }));
  return options.value.slice(0, 3);
});
</script>

<template>
  <article>
    <Box
      as="header"
      color="red"
      variant="light"
      class="grid grid-cols-1 md:grid-cols-3 items-center mb-8"
    >
      <Box as="section" class="prose-lg px-12 py-8">
        <h1>Capital Projects</h1>
        <p>
          When a road is re-designed as part of a capital project, road
          reconstruction, or in some instances as part of a repaving project,
          PBOT needs to determine the appropriate cross-section for the street.
          StreetsPDX developed a decision-making process that provides PBOT with
          an organized and rational process for considering a roadway's context,
          the trade-offs between different right-of-way uses, and guidance for
          what to do when there is not sufficient space to accommodate all
          policy-specified uses to their preferred dimensions.
        </p>
      </Box>
      <figure class="md:col-span-2">
        <Image
          :src="`${publicPath}img/capital-projects/tractor.webp`"
          alt="Rendering of a street to show the different responsibilities in the right-of-way"
        />
      </figure>
    </Box>
    <main class="px-12 grid grid-cols-1 gap-8">
      <section class="prose">
        <Box as="h2" class="inline flex items-center gap-2">
          <span class="px-3 py-1 border border-current rounded-full">1</span
          ><span>Identify project parameters and cross-sections</span>
        </Box>
        <p>
          Locate your project using the StreetsPDX map. Click a street to access
          its street design and other transportation system plan (TSP)
          classifications, street width, and typical cross sections associated
          with it.
        </p>
        <p>
          Click “View cross sections” button to see the cross-section options
          available for that street segment.
        </p>
        <p>
          Select the "Option" link below each cross section to see "episodic"
          sections that illustrate elements that might be needed periodically
          (such as left turn lanes, pedestrian crossings, or transit priority
          lanes).
        </p>
        <Message
          color="blue"
          variant="light"
          icon="information"
          summary="Cross sections can be classified ideal, balanced or alternative"
          class="mb-4"
        >
          <p>
            “Ideal” - all right-of-way uses identified in policy can be
            accommodated to their preferred dimensions.
          </p>
          <p>
            “Balanced” - all right-of-way uses identified in policy can be
            accommodated, but not all to preferred dimensions due to space
            constraints.
          </p>
          <p>
            “Alternative” - needed when a balanced cross-section cannot be
            achieved in a manner acceptable to the right-of-way uses identified
            in policy.
          </p>
        </Message>
        <Message
          color="tangerine"
          variant="light"
          icon="question"
          summary="What if the street does not have an available typical section?"
        >
          <p>
            Typical sections are intended as a starting point for capital
            project design. Staff may develop new cross sections to complement
            the existing typical sections or when typical sections are not
            available for a given street width. This could include adapting a
            cross section from a similar street width. Staff would then apply
            the framework for working through trade-offs.
          </p>
        </Message>
      </section>
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <main class="prose">
          <Box as="h2" class="inline flex items-center gap-2">
            <span class="px-3 py-1 border border-current rounded-full">2</span>
            <span>Select Street Sections to Advance</span>
          </Box>
          <p>
            Based on project goals and modal priorities, choose one or more
            sections to advance. A matrix comparison is automatically generated
            and provides a visualization of potential trade-offs for each
            option. The visualization is generated based on street type, width,
            and modal priorities identified in the TSP.
          </p>
          <p>
            The matrix includes evaluations for mobility and access. Mobility
            evaluates the ability to travel along a corridor, whether as a
            pedestrian or by bicycle, transit, freight or motor vehicle. Access
            evaluates the ability to access destinations on the corridor,
            including the ability to safely cross the street, reach destinations
            by bicycle, access the curb at transit stops, and to serve loading
            and parking needs.
          </p>
          <Message
            color="blue"
            variant="light"
            icon="information"
            summary="Color coding highlights where trade-offs need to be considered"
            class="mb-4"
          >
            <dl class="mt-4 grid grid-cols-1 gap-1 items-center md:w-50">
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="3" class="w-20 h-10" /></dt>
                <dd>
                  Mode or use is accommodated at preferred dimensions in the
                  cross-section
                </dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="2" class="w-20 h-10" /></dt>
                <dd>
                  Mode or use supported with less than preferred dimensions.
                  Analyze to determine if trade-offs are acceptable and/or can
                  be mitigated through design
                </dd>
              </div>
              <div class="flex items-center gap-4">
                <dt><Scorebox :score="1" class="w-20 h-10" /></dt>
                <dd>
                  Mode or use not accommodated; depending on policy designations
                  of street, may be an “alternative” section
                </dd>
              </div>
            </dl>
          </Message>
          <Message
            color="blue"
            variant="light"
            icon="information"
            summary="The shading identifies the policy priority of each function on that
          street"
            class="mb-4"
          >
            <dl class="mt-4 grid grid-cols-1 gap-1 items-center md:w-50">
              <div class="flex items-center gap-4">
                <dt>
                  <Scorebox
                    color="white"
                    :score="3"
                    priority="lower"
                    class="w-20 h-10"
                  />
                </dt>
                <dd>Mode or use is not required by policy</dd>
              </div>
              <div class="flex items-center gap-4">
                <dt>
                  <Scorebox
                    color="white"
                    :score="3"
                    priority="none"
                    class="w-20 h-10"
                  />
                </dt>
                <dd>
                  Street is on the network for that mode of transportation, but
                  not with the highest priority designation *
                </dd>
              </div>
            </dl>
            <footer class="prose-sm">
              <p>
                * On Main Streets, hatched shading is applied to the mobility
                functions only, to illustrate there is still a need to consider
                access to adjacent land uses. On Corridors, a lower
                classification means that neither mobility nor access are high
                priorities for that mode by policy, so both cells are shaded.
              </p>
            </footer>
          </Message>
        </main>
        <aside>
          <figure class="prose max-w-none">
            <Scoresheet
              class="py-2"
              :options="options"
              :mainStreet="false"
              :priorities="{
                pedestrian: 'higher',
                bicycle: 'higher',
                transit: 'lower',
                freight: 'none',
                traffic: 'higher',
              }"
              :show-controls="false"
            >
              <template v-slot="{ option }">
                <Image
                  :src="`${publicPath}img/cross-section/${width}/${option.continuousImage}.webp`"
                  :sizes="[640]"
                />
                <Box
                  color="gray"
                  variant="light"
                  class="p-2 flex justify-center rounded-md"
                >
                  {{ option.name }}
                </Box>
              </template>
            </Scoresheet>
            <figcaption>
              A demonstration matrix is provided showing the different features
              for evaluating a cross-section
            </figcaption>
          </figure>
        </aside>
      </section>
      <section class="prose">
        <Box as="h2" class="inline flex items-center gap-2">
          <span class="px-3 py-1 border border-current rounded-full">3</span>
          <span>Justification of selected section</span>
        </Box>
        <p>
          This framework for evaluating tradeoffs between cross-sections is
          intended to help staff document, both internally and to the public,
          how they have considered trade-offs in the recommendation of a
          balanced or alternative cross-section, where applicable.
        </p>
        <p>
          A
          <Anchor
            :url="`${publicPath}doc/Right-of-way Tradeoff Analysis Handbook.pdf`"
            >Right-of-Way Tradeoff Analysis Handbook</Anchor
          >
          helps staff to consistently identify when a balanced section is deemed
          acceptable for adequately meeting all modal priorities, or to identify
          mitigations for the modes not served directly on the corridor.
        </p>
        <p>
          Identify the yellow and red cells on each cross section being
          considered and refer to the Handbook to determine whether a tradeoff
          is acceptable.
        </p>
        <Message
          color="blue"
          variant="light"
          icon="information"
          summary="The process for evaluating tradeoffs utilizes the following steps"
          class="mb-4"
        >
          <p>
            The “Analysis of Tradeoffs” column identifies analyses to inform if
            a tradeoff is acceptable (e.g., of minimal impact or can be
            addressed through project design).
          </p>
          <p>
            The “Potential Reasons for Accepting Tradeoffs” column supports
            consistent documentation when a constraint cannot be overcome.
          </p>
          <p>
            The “Options to Mitigate Tradeoffs” column identifies options to
            mitigate impacts to a mode or use, either due to varying from
            preferred dimensions or when a use is not accommodated on the
            corridor.
          </p>
        </Message>
      </section>
      <figure class="prose max-w-none">
        <Image :src="`${publicPath}img/capital-projects/gantt.webp`" />
        <figcaption>
          This graphic illustrates how the Streets 2035 framework fits into the
          overall project development process. It supports the development and
          preliminary evaluation of cross sections to be advanced to the public,
          complementing existing PBOT processes such as those for project
          selection, application of the equity matrix, and stakeholder
          engagement.
        </figcaption>
      </figure>
    </main>
  </article>
</template>
