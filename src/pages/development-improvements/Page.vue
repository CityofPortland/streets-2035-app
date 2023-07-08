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
  <article class="mb-8 grid grid-cols-1 gap-4">
    <Box
      as="header"
      color="tangerine"
      variant="light"
      class="grid grid-cols-1 lg:grid-cols-2 mb-8"
    >
      <Box as="section" class="prose prose-lg px-4 lg:pl-12 py-12">
        <h1 class="text-current">
          Development-Related Public Improvements in the Right-of-Way
        </h1>
        <p>
          This page identifies policies and requirements that may apply to a
          development project and influence the allocation of space in the
          right-of-way. It also identifies the different paths for seeking
          approval to deviate from a standard requirement.
        </p>
        <p>
          You should use this page in combination with
          <Anchor
            url="https://www.portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way"
            >our guide to city standards, guidelines, and requirements.</Anchor
          >
          Use the image or scroll down to navigate to the standards that you are
          interested in learning more about. Each section has a link to read the
          specific section of our guide. For more help using this tool and the
          rest of this site, use the
          <router-link to="/training" custom v-slot="{ href, navigate }"
            ><Anchor :url="href" @click="navigate"
              >training page.</Anchor
            ></router-link
          >
        </p>
        <p>
          Neither page is an exhaustive list and additional information may be
          available. Refer to the city's
          <Anchor url="https://www.portlandoregon.gov/53147"
            >Public Works Permitting page</Anchor
          >
          for information related to public works projects, including permit,
          fee and
          <Anchor url="https://www.portlandoregon.gov/61813"
            >technical resources</Anchor
          >. For more information on the development review process, refer to
          <Anchor
            url="https://www.portland.gov/bds/development-permit-processes"
            >Development Review and Permit Process (BDS)</Anchor
          >
          and
          <Anchor url="https://www.portland.gov/transportation/development"
            >Transportation Development Review and Early Assistance.</Anchor
          >
        </p>
      </Box>
      <figure class="w-full flex flex-col prose max-w-none p-4">
        <House
          class="w-full"
          :links="{
            access: '#access',
            frontage: '#frontage',
            stormwater: '#stormwater',
            tree: '#tree',
            utility: '#utility',
          }"
        />
        <figcaption class="text-current">
          Features in the public right-of-way surrounding development. Use the
          colored boxes pointing to the right-of-way features to help navigate
          this page.
        </figcaption>
      </figure>
    </Box>
    <main class="px-4 lg:pl-12 grid grid-cols-1 gap-8">
      <Box
        id="frontage"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-cyan-500"
      >
        <div class="flex">
          <div class="flex text-cyan-500">
            <Frontage class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-8">
            <div class="border-b border-current pb-8 prose">
              <h2>Frontage Improvements</h2>
              <h3>Requirements and standards</h3>
              <p>
                Sidewalk standards are defined in the Pedestrian Design Guide
                and are applied based on the Street Design Classification of the
                street. Private development projects that meet the triggers in
                <Anchor url="https://www.portland.gov/code/17/88/020"
                  >17.88.020</Anchor
                >
                are required to bring their frontage up to current standards.
              </p>
              <Anchor
                url="https://www.portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way#toc-sidewalks-and-pedestrian-crossings"
                class="text-center"
                >Read more about sidewalk requirements and standards</Anchor
              >
            </div>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="prose">
                <h3>How to deviate from standard improvements</h3>
                <p>
                  PBOT's Public Works Alternative (PWA) review process allows an
                  applicant to submit an alternative to the standard sidewalk
                  cross sections required to meet current standards, codes, and
                  policies. Alternatives to construct or maintain a less than
                  standard width sidewalk for the entire frontage or at a
                  particular point are eligible for this process.
                </p>
                <p>
                  Submittal requirements for accessing the
                  <Anchor
                    url="https://www.portlandoregon.gov/article/481371#prepare"
                    >Public Works Alternative review process</Anchor
                  >
                  to request a reduction in frontage improvements to meet other
                  policies requirements (e.g., to preserve a tree) or respond to
                  site constraints (e.g., topography and/or complexity in
                  conveying stormwater) are listed in
                  <Anchor
                    url="https://www.portland.gov/policies/transportation/streets-sidewalks/trn-127-bureau-transportation-public-works-alternate"
                    >TRN 1.27.</Anchor
                  >
                  Requests to alter specific technical requirements that are
                  part of a public works permit are not eligible for this
                  process and require a
                  <Anchor
                    url="https://www.portland.gov/transportation/engineering/capital-project-delivery-process#toc-design-exceptions"
                    >PBOT Design Exception.</Anchor
                  >
                </p>
              </div>
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
          <div class="flex-1 grid grid-cols-1 gap-8">
            <div class="border-b border-current pb-8 prose">
              <h2>Tree Preservation and Planting</h2>
              <h3>Requirements and standards</h3>
              <p>
                The city has established standards for the preservation of
                existing trees, clearances to other infrastructure, and
                procedures for tree removal and replacement. Frontage (sidewalk)
                improvements trigger standards for planting street trees. City
                or Street tree removal requires the approval of the City
                Forester (<Anchor url="https://www.portland.gov/code/11/50/040"
                  >PCC 11.50.040</Anchor
                >)
              </p>
              <Anchor
                url="https://www.portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way#toc-street-trees"
                >Read more about street tree requirements and standards</Anchor
              >
            </div>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="prose">
                <h3>How to deviate from standard improvements</h3>
                <p>
                  A
                  <Anchor
                    url="https://www.portland.gov/trees/trees-development/tree-plan-requirements-development-permits"
                    >tree plan</Anchor
                  >
                  is required in conjunction with all development permits
                  (11.50.020) to indicate trees to be retained, proposed for
                  removal, and planted.
                </p>
                <p>
                  A
                  <Anchor
                    url="https://www.portland.gov/trees/treepermits/do-i-need-tree-permit/tree-requirements-building-permits"
                    >street tree considerations checksheet</Anchor
                  >
                  is a tool for assessing the relative preservation value of
                  street trees, and clarifies preservation options when
                  developing a site, which can support requests for City or
                  Street tree removal.
                </p>
                <p>
                  This form, completed by an arborist or Urban Forestry, should
                  also accompany requests to modify standard sidewalk
                  requirements to preserve a tree (see Frontage Improvements
                  section above)
                </p>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box
        id="access"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-purple-500"
      >
        <div class="flex">
          <div class="flex text-purple-500">
            <Access class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-8">
            <div class="border-b border-current pb-8 prose">
              <h2>Access and Loading</h2>
              <h3>Requirements and standards</h3>
              <p>
                Requirements for access and loading on private property are
                defined in city code and influence the space available for other
                infrastructure in the pedestrian zone, such as street trees,
                furnishings such as bike racks, or utility connections.
              </p>
              <Anchor
                url="https://www.portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way#toc-access-and-loading"
                class="text-center"
                >Read more about access and loading requirements and
                standards</Anchor
              >
            </div>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="prose">
                <h3>How to deviate from standard improvements</h3>
                <p>
                  Deviation from rules related to the design of driveways
                  requires a
                  <Anchor
                    url="https://www.portland.gov/transportation/engineering/design#toc-design-exceptions"
                    >Driveway Design Exception</Anchor
                  >. Requests to modify loading requirements are evaluated
                  through an
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
        </div>
      </Box>
      <Box
        id="stormwater"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-orange-500"
      >
        <div class="flex">
          <div class="flex text-orange-500">
            <Stormwater class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-8">
            <div class="border-b border-current pb-8 prose">
              <h2>Stormwater Management</h2>
              <h3>Requirements and standards</h3>
              <p>
                Frontage improvements may trigger the city's Stormwater
                Management Manual (SWMM) and require treatments to support the
                city's livability and improve watershed health by mitigating the
                impacts of urbanization and protecting our storm systems,
                drainageways, and combined sewers. Projects that add or replace
                500 square feet or more of pavement should check if SWMM
                compliance is required.
              </p>
              <Anchor
                url="https://www.portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way"
                >Read more about stormwater requirements and standards</Anchor
              >
            </div>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="prose">
                <h3>How to deviate from standard improvements</h3>
                <p>
                  When public improvements require stormwater management,
                  <Anchor
                    url="https://www.portland.gov/bes/stormwater/swmm-and-right-way-projects/meeting-requirements"
                    >options are potentially available to meet SWMM requirements
                    in the right-of-way</Anchor
                  >
                  depending on the specific characteristics of the project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box
        id="utility"
        as="section"
        class="grid grid-cols-1 gap-4 pl-4 border-l-4 border-blue-500"
      >
        <div class="flex">
          <div class="flex text-blue-500">
            <Utility class="w-24 h-24" />
          </div>
          <div class="flex-1 grid grid-cols-1 gap-8">
            <div class="border-b border-current pb-8 prose">
              <h2>Utility Services</h2>
              <h3>Requirements and standards</h3>
              <p>
                Utility services clearance requirements serve to protect
                infrastructure and maintain space to access for maintenance or
                replacement.
              </p>
              <p>
                Because utility and access clearances can influence space for
                other infrastructure, the Street Design Guide contains
                principles for the efficient layout of utilities along a
                frontage to help preserve tree planting sites and space for
                stormwater management.
              </p>
              <Anchor
                url="https://www.portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way#toc-utilities"
                class="text-center"
                >Read more about utility requirements and standards</Anchor
              >
            </div>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="prose">
                <h3>How to deviate from standard improvements</h3>
                <p>
                  Refer the 'Processes for Deviating from Standard Improvements'
                  section below. Utility services include water and sewer as
                  well as franchised utilities such as electricity, natural gas,
                  and telecommunications.
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
        </div>
      </Box>
      <section class="prose">
        <h2 id="deviation">
          Processes for deviating from standard improvements
        </h2>
        <h3>Alternative to Technical Requirements</h3>
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="inline-flex">
              <Frontage class="w-8 h-8" />
              <span>Frontage Improvements</span>
            </div>
            <div class="grid grid-cols-1">
              <Anchor
                url="https://www.portland.gov/policies/transportation/streets-sidewalks/trn-127-bureau-transportation-public-works-alternate"
                >PBOT Public Works Alternative Process (PWA)</Anchor
              >
              <Anchor
                url="https://www.portland.gov/transportation/engineering/design#toc-design-exceptions"
                >PBOT Design Exceptions</Anchor
              >
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="inline-flex">
              <Tree class="w-8 h-8" />
              <span>Tree Preservation and Planting</span>
            </div>
            <Anchor url="https://www.portland.gov/code/11/50/090"
              >Administrative Review (Trees in Development Situations)</Anchor
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
              <span>Utility Services</span>
            </div>
            <div class="grid grid-cols-1">
              <Anchor
                url="https://www.portland.gov/water/water-development-services/engineering-admin-rule"
                >Water Bureau Engineering & Technical Standards</Anchor
              >
              <Anchor
                url="https://www.portland.gov/policies/transportation/right-way-access/trn-813-utility-vault-or-structure-benefit-adjacent"
                >Utility Vault or Structure for the Benefit of the Adjacent
                Property Owner</Anchor
              >
            </div>
          </div>
        </div>
      </section>
    </main>
  </article>
</template>
