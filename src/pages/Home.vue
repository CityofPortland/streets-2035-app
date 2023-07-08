<template>
  <article>
    <Box
      as="header"
      color="blue"
      variant="dark"
      class="grid grid-cols-1 lg:grid-cols-2"
    >
      <Box as="section" class="prose prose-lg px-4 lg:pl-12 py-12">
        <h1 class="text-current">Welcome to StreetsPDX</h1>
        <p>
          StreetsPDX is a design framework intended to support policy
          implementation and decision-making in the right-of-way consistent with
          the City's 2035 Comprehensive Plan. It brings together the various
          policies and corresponding design standards that influence space in
          the right-of-way as part of private development and with city led
          capital projects. Because individual sites and projects in constrained
          urban environments can vary in their challenges and opportunities, the
          framework also identifies the deviation processes that provide
          flexibility when it is not possible to meet all applicable standards.
        </p>
      </Box>
      <Image
        :src="`${publicPath}img/home/hero.webp`"
        alt="Rendering of a street to show the different responsibilities in the right-of-way"
        class="w-full h-full object-cover"
      />
    </Box>
    <main>
      <Box as="section" color="cyan" variant="light" class="py-8">
        <div class="text-center">
          <p>
            This site is a tool for helping users navigate the framework. It has
            several informational sections to help users understand the
            StreetsPDX framework.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 justify-items-center">
          <Box as="div" class="p-12 flex flex-col gap-4 prose">
            <header
              class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 2.75v18.5m-7.5-0.5v-2.5m 0 -5v-2.5m 0 -5v-2.5m-7.5 -0.5v18.5"
                />
              </svg>
              <h2 class="text-3xl text-center font-bold">Street types</h2>
            </header>
            <p>
              All streets in Portland have a role in fostering, absorbing, and
              sustaining the impacts of a growing city. Portland's
              Transportation System Plan (TSP) includes a “Street Design”
              classification which assigns each street a “type” based on a
              combination of the transportation function and the adjacent land
              use context. These “Street Types” are a foundational element of
              the StreetsPDX decision-making framework.
            </p>
            <footer class="mt-auto flex flex-col items-center not-prose">
              <router-link to="/street-types">
                <Button
                  label="Read about street types"
                  size="large"
                  color="orange"
                />
              </router-link>
            </footer>
          </Box>
          <Box as="div" class="p-12 flex flex-col gap-4 prose">
            <header
              class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
              <h2 class="text-3xl text-center font-bold">
                Development Improvements
              </h2>
            </header>
            <p>
              This tool allows users to visualize the different standards that
              may apply to their development project, with links to available
              deviation processes and a more detailed page of city standards,
              guidelines and requirements that impact space in right-of-way.
            </p>
            <footer class="mt-auto flex flex-col items-center not-prose">
              <router-link to="/development-improvements">
                <Button
                  label="Read about development improvements"
                  size="large"
                  color="orange"
                  class="text-center"
                />
              </router-link>
            </footer>
          </Box>
          <Box as="div" class="p-12 flex flex-col gap-4 prose">
            <header
              class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
              <h2 class="text-3xl text-center font-bold">City Projects</h2>
            </header>
            <p>
              When a road is re-designed as part of a city project or road
              reconstruction, PBOT needs to determine the appropriate
              cross-section for the street. StreetsPDX developed a
              decision-making process that provides PBOT with an organized and
              rational process for considering a roadway's context, the
              trade-offs between different right-of-way uses, and guidance for
              what to do when there is not sufficient space to accommodate all
              policy-specified uses to their preferred dimensions.
            </p>
            <footer class="mt-auto flex flex-col items-center not-prose">
              <router-link to="/city-projects">
                <Button
                  label="Read about city projects"
                  size="large"
                  color="orange"
                />
              </router-link>
            </footer>
          </Box>
        </div>
      </Box>
      <Box
        as="section"
        color="blue"
        variant="light"
        class="py-8 grid grid-cols-1 justify-items-center"
      >
        <Box as="div" class="p-12 flex flex-col gap-4 prose">
          <header
            class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-24 h-24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h2 class="text-3xl text-center font-bold">
              Right-of-way Policies
            </h2>
          </header>
          <p>
            We have created a page on portland.gov that identifies commonly
            referenced design guidelines, standards and clearance requirements
            that influence how space is organized in the public right-of-way.
            This is not an exhaustive list, as the multiple bureaus that operate
            within the right-of-way have developed a variety of documents that
            inform their work and may apply to a given city-led or private
            development project. This is a starting point to understand policies
            that apply in the public right-of-way.
          </p>
          <footer class="mt-auto flex flex-col items-center not-prose">
            <router-link
              to="//portland.gov/transportation/permitting/city-standards-guidelines-requirements-impact-space-right-way"
            >
              <Button
                label="Read about right-of-way policies"
                size="large"
                color="orange"
              />
            </router-link>
          </footer>
        </Box>
      </Box>
      <Box as="section" color="cyan" variant="dark" class="py-8">
        <div class="text-center">
          <p>
            This site also contains interactive elements to help users
            understand what street design policies might apply to their
            projects.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 justify-items-center">
          <Box as="div" class="p-12 flex flex-col gap-4 prose">
            <header
              class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              <h2 class="text-3xl text-center font-bold">Street map</h2>
            </header>
            <p>
              Our interactive map identifies the road width and various policy
              designations for each street. Use the map to navigate to your area
              of interest. You may then browse that information on each street
              segment within that area. If a street section has applicable
              cross-sections, they will be linked from their information that
              identifies the road width and various policy designations for each
              street.
            </p>
            <footer class="mt-auto flex flex-col items-center not-prose">
              <router-link to="/streets">
                <Button label="Browse the map" size="large" color="orange" />
              </router-link>
            </footer>
          </Box>
          <Box as="div" class="p-12 flex flex-col gap-4 prose">
            <header
              class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <h2 class="text-3xl text-center font-bold">
                Cross-section viewer
              </h2>
            </header>
            <p>
              Our robust cross section tool shows typical street section images
              for Portland's most common roadway widths. You can use this to
              identify what tradeoffs each type of roadway layout has.
            </p>
            <footer class="mt-auto flex flex-col items-center not-prose">
              <router-link to="/cross-section">
                <Button
                  label="Use the cross-section tool"
                  size="large"
                  color="orange"
                />
              </router-link>
            </footer>
          </Box>
          <Box as="div" class="p-12 flex flex-col gap-4 prose">
            <header
              class="mx-auto uppercase flex flex-col gap-2 items-center not-prose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>

              <h2 class="text-3xl text-center font-bold">
                Sidewalk tradeoff evaluation
              </h2>
            </header>
            <p>
              This tool identifies tradeoffs when constructing or maintaining a
              less than standard sidewalk. This can inform decision-making with
              private development or city projects.
            </p>
            <footer class="mt-auto flex flex-col items-center not-prose">
              <router-link to="/sidewalk-tradeoffs">
                <Button
                  label="Evaluate sidewalk tradeoffs"
                  size="large"
                  color="orange"
                />
              </router-link>
            </footer>
          </Box>
        </div>
      </Box>
    </main>
  </article>
</template>

<script setup lang="ts">
import Box from '@/elements/box/Box';
import Button from '@/elements/button/Button.vue';
import Image from '@/elements/img/Image.vue';

const publicPath = process.env.BASE_URL;
</script>
