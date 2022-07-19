<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import House from './House.vue';
import Access from './Access.vue';
import Frontage from './Frontage.vue';
import Stormwater from './Stormwater.vue';
import Tree from './Tree.vue';
import Utility from './Utility.vue';

const { currentRoute } = useRouter();

onMounted(() => {
  if (
    currentRoute.value.hash &&
    document.querySelector(currentRoute.value.hash)
  ) {
    document.querySelector(currentRoute.value.hash)?.scrollIntoView();
  }
});
</script>

<template>
  <article class="max-w-7xl mt-8 px-4 mx-auto mb-8 grid grid-cols-1 gap-4">
    <header class="prose-lg">
      <h1>Public Improvements in the Right-of-Way</h1>
      <p>
        This page identifies policies and requirements that may apply to a
        development project and influence the allocation of space in the
        right-of-way. It also identifies the different paths for seeking
        approval to deviate from a standard requirement.
      </p>
      <p>
        This is not an exhaustive list and additional information may be
        available on individual bureau websites. Refer to the city's
        <Anchor url="https://www.portlandoregon.gov/53147"
          >Public Works Permitting page</Anchor
        >
        for information related to public works projects, including permit, fee
        and
        <Anchor url="https://www.portlandoregon.gov/61813"
          >technical resources</Anchor
        >. For more information on the development review process, refer to
        <Anchor url="https://www.portland.gov/bds/development-permit-processes"
          >Development Review and Permit Process (BDS)</Anchor
        >
        and
        <Anchor url="https://www.portland.gov/transportation/development"
          >Transportation Development Review and Early Assistance.</Anchor
        >
      </p>
      <House
        :links="{
          access: '#access',
          frontage: '#frontage',
          stormwater: '#stormwater',
          tree: '#tree',
          utility: '#utility',
        }"
      />
    </header>
    <main class="prose grid grid-cols-1 gap-4">
      <Box
        id="frontage"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-cyan-500"
      >
        <div class="flex">
          <div class="flex text-cyan-500">
            <Frontage class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-4">
            <div class="border-b border-current pb-4 prose">
              <h2>Frontage Improvements</h2>
              <p>
                Sidewalk standards are defined in the Pedestrian Design Guide
                and are applied based on the Street Design Classification of the
                street. Private development projects that meet the triggers in
                <Anchor url="https://www.portland.gov/code/17/88/020"
                  >17.88.020</Anchor
                >
                are required to bring their frontage up to current standards.
              </p>
            </div>
            <div class="prose-sm">
              <h3>How to deviate from standard improvements</h3>
              <p>
                A Public Works Alternative (PWA) review process allows an
                applicant to submit an alternative to the identified public
                improvements required to meet current standards, codes, and
                policies.
              </p>
              <p>
                <Anchor
                  url="https://www.portlandoregon.gov/article/481371#prepare"
                  >Criteria for Accessing the Public Works Alternative
                  Process.</Anchor
                >
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box
        id="tree"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-green-500"
      >
        <div class="flex">
          <div class="flex text-green-500">
            <Tree class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-4">
            <div class="border-b border-current pb-4 prose">
              <h2>Tree Planting and Preservation</h2>
              <p>
                Frontage (sidewalk) improvements trigger standards for planting
                street trees. The city also has established standards for the
                preservation of existing trees, clearances to other
                infrastructure, and procedures for tree removal and replacement.
                Applicants are required to consult with the City Forester at the
                preliminary project design phase if City or Street Tree removal
                is likely to occur to complete the project (<Anchor
                  url="https://www.portland.gov/code/11/50/040"
                  >PCC 11.50.040.C.2</Anchor
                >)
              </p>
            </div>
            <div class="prose-sm">
              <h3>How to deviate from standard improvements</h3>
              <p>
                Modifications to standard sidewalk requirements to preserve a
                tree requires a Public Works Alternative. A tree considerations
                checksheet, completed by an arborist or Urban Forestry, should
                accompany this request. The tree considerations checksheet is a
                tool for assessing the relative preservation value of street
                trees, and clarifies preservation options when developing a
                site, which can support requests for City or Street tree removal
                when these are deemed not feasible.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box
        id="access"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-red-500"
      >
        <div class="flex">
          <div class="flex text-red-500">
            <Access class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-4">
            <div class="border-b border-current pb-4 prose">
              <h2>Access and Loading</h2>
              <p>
                Requirements for access and loading on private property are
                defined in city code and influence the space available for other
                infrastructure in the pedestrian zone, such as street trees,
                furnishings such as bike racks, or utility connections.
              </p>
            </div>
            <div class="prose-sm">
              <h3>How to deviate from standard improvements</h3>
              <p>
                Deviation from rules related to the design of driveways requires
                a
                <Anchor
                  url="https://www.portland.gov/transportation/engineering/design#toc-design-exceptions"
                  >Driveway Design Exception</Anchor
                >. Requests to modify loading requirements are evaluated through
                an
                <Anchor
                  url="https://www.portland.gov/bds/zoning-land-use/land-use-review-fees-and-types/adjustment-reviews"
                  >adjustment review</Anchor
                >
                and associated
                <Anchor
                  url="https://www.portland.gov/sites/default/files/code/33.805-adjustments.pdf"
                  >approval criteria.</Anchor
                >
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box
        id="stormwater"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-marine-500"
      >
        <div class="flex">
          <div class="flex text-marine-500">
            <Stormwater class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-4">
            <div class="border-b border-current pb-4 prose">
              <h2>Stormwater Management</h2>
              <p>
                Frontage improvements may trigger the city's Stormwater
                Management Manual (SWMM) and require treatments to support the
                city's livability and improve watershed health by mitigating the
                impacts of urbanization and protecting our storm systems,
                drainageways, and combined sewers.
              </p>
            </div>
            <div class="prose-sm">
              <h3>How to deviate from standard improvements</h3>
              <p>
                When public improvements require stormwater management,
                <Anchor
                  url="https://www.portland.gov/bes/stormwater/swmm-and-right-way-projects/meeting-requirements"
                  >four options are potentially available to meet SWMM
                  requirements in the right-of-way</Anchor
                >
                depending on the specific characteristics of the project.
              </p>
              <p>
                Modifications to the standard sidewalk requirements due to
                topography (including complexity in conveying stormwater)
                require a Public Works Alternative.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box
        id="utility"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-orange-500"
      >
        <div class="flex">
          <div class="flex text-orange-500">
            <Utility class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-4">
            <div class="border-b border-current pb-4 prose">
              <h2 id="utility">Utility Clearance</h2>
              <p>
                Utility clearance requirements serve to protect infrastructure
                and maintain space to access for maintenance or replacement.
              </p>
            </div>
            <div class="prose-sm">
              <h3>How to deviate from standard improvements</h3>
              <p>
                Because utility and access clearances can influence space for
                other infrastructure, the Street Design Guide contains
                principles for the efficient layout of utilities along a
                frontage to help preserve tree planting sites and space for
                stormwater management.
              </p>
              <p>
                Applicants are expected to plan for power on site. Requests to
                site electrical transformers in the right-of-way requires an
                exception as defined in
                <Anchor
                  url="https://www.portland.gov/policies/transportation/right-way-access/trn-813-utility-vault-or-structure-benefit-adjacent"
                  >TRN 8.13.</Anchor
                >
              </p>
            </div>
          </div>
        </div>
      </Box>
      <h2 id="deviation">Processes for deviating from standard improvements</h2>
      <h3>Public Works Alternative Process</h3>
      <p>
        A Public Works Alternative (PWA) Review Process allows an applicant to
        submit an alternative to the standard sidewalk per the identified
        standards, code and policies. Note that a PWA cannot approve altering
        specific technical requirements such as ADA standards and items
        requiring approval of a Design Exception by the City Engineer.
      </p>
      <div class="grid grid-cols-2 gap-4">
        <Box
          color="cyan"
          variant="light"
          as="a"
          href="https://www.portland.gov/policies/transportation/streets-sidewalks/trn-127-bureau-transportation-public-works-alternate"
          class="p-4 flex flex-col items-center"
          style="box-shadow: 10px 10px currentColor"
        >
          <span class="font-bold">TRN 1.27</span>
          <span class="text-center"
            >Bureau of Transportation Public Works Alternative Review
            Committee</span
          >
        </Box>
        <Box
          color="tangerine"
          variant="light"
          as="a"
          href="https://www.portlandoregon.gov/article/481371#prepare"
          class="p-4 flex flex-col items-center"
          style="box-shadow: 10px 10px currentColor"
        >
          <span class="font-bold uppercase">Criteria</span>
          <span class="text-center"
            >For Accessing the Public Works Alternative process</span
          >
        </Box>
      </div>
      <h3>Alternative to Technical Requirements</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="inline-flex">
          <Frontage class="w-8 h-8" />
          <span>Frontage Improvements</span>
        </div>
        <Anchor
          url="https://www.portland.gov/transportation/engineering/design#toc-design-exceptions"
          >PBOT Design Exceptions</Anchor
        >
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="inline-flex">
          <Tree class="w-8 h-8" />
          <span>Tree Planting and Preservation</span>
        </div>
        <Anchor url="https://www.portland.gov/code/11/50/070"
          >Tree Plan Submittal Requirements</Anchor
        >
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="inline-flex">
          <Access class="w-8 h-8" />
          <span>Access and Loading</span>
        </div>
        <div class="grid grid-cols-1">
          <Anchor
            url="https://www.portland.gov/transportation/engineering/design#toc-design-exceptions"
            >Driveway Design Exception</Anchor
          >
          <Anchor
            url="https://www.portland.gov/bds/zoning-land-use/land-use-review-fees-and-types/adjustment-reviews"
            >Loading (adjustment review)</Anchor
          >
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="inline-flex">
          <Stormwater class="w-8 h-8" />
          <span>Stormwater Management</span>
        </div>
        <Anchor
          url="https://www.portland.gov/bes/stormwater/swmm-and-right-way-projects/meeting-requirements"
          >Options for meeting stormwater requirements</Anchor
        >
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="inline-flex">
          <Utility class="w-8 h-8" />
          <span>Utility Clearances</span>
        </div>
        <div class="grid grid-cols-1">
          <Anchor
            url="https://www.portland.gov/water/water-development-services/engineering-admin-rule"
            >Water Bureau Engineering & Technical Standards</Anchor
          >
          <Anchor
            url="https://www.portland.gov/policies/transportation/right-way-access/trn-813-utility-vault-or-structure-benefit-adjacent"
            >Utility Vault or Structure for the Benefit of the Adjacent Property
            Owner</Anchor
          >
        </div>
      </div>
    </main>
  </article>
</template>
