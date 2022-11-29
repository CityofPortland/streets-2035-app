<script setup lang="ts">
import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Image from '@/elements/img/Image.vue';
import Legend from '@/components/cross-section/Legend.vue';
import Scoresheet from '@/components/cross-section/Scoresheet.vue';
import { useCrossSection } from '@/composables/cross-section';
import { computed, ref } from 'vue';

const publicPath = process.env.BASE_URL;
const width = 50;
const options = computed(() => {
  const { options } = useCrossSection(ref({ width }));
  return options.value.slice(0, 3);
});
</script>

<template>
  <article class="max-w-7xl px-4 mx-auto">
    <header class="prose-lg">
      <h1>Capital Projects</h1>
      <p>
        When a road is re-designed as part of a capital project, road
        reconstruction, or in some instances as part of a repaving project, PBOT
        needs to determine the appropriate cross-section for the street.
        Described below, Streets 2035 developed a decision-making process that
        provides PBOT with an organized and rational process for considering a
        roadway's context, the trade-offs between different right-of-way uses,
        and guidance for what to do when there is not sufficient space to
        accommodate all policy-specified uses to their preferred dimensions.
      </p>
    </header>
    <main class="grid grid-cols-1 gap-8">
      <section class="prose">
        <h2>Identify project parameters</h2>
        <p>
          Locate your project using the Streets 2035 map. Click a street segment
          to access information about its street design and other TSP
          classifications, width, and the typical cross section(s) associated
          with it.
        </p>
        <h2>Identify cross-section options</h2>
        <p>
          Click on the “View cross sections” button to see the cross-section
          options available for that street segment. Typical Sections illustrate
          the various ways that the street cross-section could be laid out and
          are available for the eight most common roadway widths in Portland.
        </p>

        <p>
          Typical sections can be accessed from the curb-to-curb width drop-down
          menu on the [insert title] page or by selecting a specific road
          segment from the map. Select the "Option" link below each section to
          launch a new page with "episodic" cross sections that illustrate
          elements not needed continuously throughout a corridor (such as left
          turn lanes, pedestrian crossings, or transit priority lanes) and help
          visualize where the space for these elements comes from.
        </p>
        <p>Cross sections can be classified ideal, balanced or alternative:</p>
        <ul>
          <li>
            <p>
              An “Ideal” cross-section is one where all right-of-way uses
              identified in policy can be accommodated to their preferred
              dimensions.
            </p>
          </li>
          <li>
            <p>
              A “Balanced” cross-section reflects a level of compromise from the
              “ideal” cross-section where all right-of-way uses identified in
              policy can be accommodated, but not all of to their preferred
              dimensions due to space constraints. “Balanced” cross-sections
              need to be evaluated to determine if the compromises to the
              accommodation of each mode are acceptable.
            </p>
          </li>
          <li>
            <p>
              An “Alternative” cross-section is needed when a balanced
              cross-section cannot be achieved in a manner acceptable to the
              right-of-way uses identified in policy. “Alternative” sections may
              require a different accommodation for one or more right-of-way
              uses, such as providing travel for a particular mode on a parallel
              route.
            </p>
          </li>
        </ul>
        <h3>What if the street does not have an available typical section?</h3>
        <p>
          Typical sections are intended as a starting point for capital project
          design. Staff may develop new cross sections to complement the
          existing typical sections or when typical sections are not available
          for a given street width. This could include adapting a cross section
          from a narrower street width. Staff would then apply the framework for
          working through trade-offs.
        </p>
      </section>
      <section class="prose">
        <h2>
          Select street section(s) to advance (framework for considering
          tradeoffs)
        </h2>
        <p>
          Based on the project goals and modal priorities, choose one or more of
          the available street cross sections to advance. A matrix comparison of
          the typical sections is automatically generated and provides a
          visualization of the potential trade-offs for each cross-section
          option. The visualization is generated based on the street type, the
          width of the street, and the modal priorities identified for the
          street in the Transportation System Plan (TSP). The priority drop-down
          boxes at the top of the page reflect the TSP designations of the
          particular street segment selected from the map.
        </p>
        <p>
          Providing this evaluation framework supports consistency in allocating
          the right-of-way and working through the trade-offs. These decisions
          will be documented by PBOT as part of the Capital Projects development
          process.
        </p>
        <p>
          The transportation functions include separate evaluations for mobility
          and access.
        </p>
        <ul>
          <li>
            <p>
              <strong>Mobility</strong> evaluates the ability to travel along a
              corridor, whether as a pedestrian or by bicycle, transit, freight
              or motor vehicle.
            </p>
          </li>
          <li>
            <p>
              <strong>Access</strong> evaluates the ability to access
              destinations on the corridor, including the ability to safely
              cross the street, reach destinations by bicycle, access the curb
              at transit stops, and to serve loading and parking needs.
            </p>
          </li>
        </ul>
        <p>
          The color-coding highlights where trade-offs need to be considered:
        </p>
        <ul>
          <li>
            Green cells: mean that the mode or use is accommodated at preferred
            dimensions in the cross-section.
          </li>
          <li>
            Yellow cells: mean that the mode or use is supported but with
            minimum or less than preferred dimensions. These trade-offs need to
            be further analyzed to determine if they are acceptable and/or if
            they can be mitigated through project design (see "Analytical
            Considerations" section below).
          </li>
          <li>
            Red cells: mean that the mode or use is not accommodated, and,
            depending on the policy designations of the street, this may be
            deemed an “alternative” cross-section. Decisions to not accommodate
            a mode or use that is established in policy need to be justified
            (see "Justification of Alternative" section below).
          </li>
        </ul>
        <p>
          The shading identifies the policy priority of each function on that
          street:
        </p>
        <ul>
          <li>
            Shaded cells (white): mean that the mode or use is not required by
            policy.
          </li>
          <li>
            Shaded cells (hatched): mean that the street is on the network for
            that mode of transportation, but not with the highest priority
            designation.
            <ul>
              <li>
                On Main Streets, hatched shading is applied to the mobility
                functions only, to illustrate there is still a need to consider
                access to adjacent land uses.
              </li>
              <li>
                On Corridors, a lower classification means that neither mobility
                nor access are high priorities for that mode by policy, so both
                cells are shaded.
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <figure class="prose-lg">
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
        <Legend class="my-4 prose" />
        <figcaption>
          A demonstration matrix is provided showing the different features for
          evaluating a cross-section
        </figcaption>
      </figure>
      <section class="prose">
        <h2>Justification of selected section</h2>
        <p>
          The decision-making process provides a framework for evaluating the
          tradeoffs between cross-sections. This process is intended to help
          staff document, both internally and to the public, how they have
          considered trade-offs in justifying the recommendation of a balanced
          or alternative cross-section, where applicable. The visualization of
          tradeoffs matrix is complemented by an
          <Anchor
            :url="`${publicPath}doc/Right-of-way Tradeoff Analysis Handbook.pdf`"
            >PBOT Tradeoffs Analysis Booklet</Anchor
          >, which helps staff to consistently identify when a balanced section
          is deemed acceptable for adequately meeting all of the modal
          priorities, or to identify mitigations for the modes not served
          directly on the corridor.
        </p>
        <p>The process utilizes the following steps:</p>
        <ul>
          <li>
            Identify the yellow and red cells on each cross section being
            considered and refer to the “Analysis of Tradeoffs” column to
            identify analyses that inform whether a tradeoff is acceptable.
            These analyses may identify that the tradeoff is of minimal impact
            or can be addressed through project design.
          </li>
          <li>
            The “Potential Reasons for Accepting Tradeoffs” directs project
            managers to assess and attempt to overcome potential constraints to
            achieving a balanced cross section. This step also supports
            consistent documentation when a constraint cannot be overcome.
          </li>
          <li>
            The “Options to Mitigate Tradeoffs” column identifies options to
            mitigate impacts to a mode or use, either due to a tradeoff from
            preferred dimensions or when a use is not accommodated on the
            corridor.
          </li>
        </ul>
        <p>
          For "balanced" sections that meet all policies, this framework helps
          staff evaluate any tradeoffs or compromises, and why they are deemed
          acceptable. The justification of an "alternative" cross-section is an
          expectation of the decision-making framework when recommending a
          cross-section that does not meet an applicable adopted policy (e.g.,
          if a decision is made to not serve a mode designated in the TSP
          classifications).
        </p>
      </section>
    </main>
    <figure class="prose-lg">
      <Image :src="`${publicPath}img/capital-projects/gantt.webp`" />
      <figcaption>
        This graphic illustrates how the Streets 2035 framework fits into the
        overall project development process. It supports the development and
        preliminary evaluation of cross sections to be advanced to the public,
        complementing existing PBOT processes such as those for project
        selection, application of the equity matrix, and stakeholder engagement.
      </figcaption>
    </figure>
  </article>
</template>
