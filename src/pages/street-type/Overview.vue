<script setup lang="ts">
import Box from '@/elements/box/Box';
import Card from '@/components/street-type/Card.vue';
import Image from '@/elements/img/Image.vue';

const publicPath = process.env.BASE_URL;
</script>

<template>
  <Box
    as="header"
    color="gray"
    variant="dark"
    class="grid grid-cols-1 lg:grid-cols-2 mb-8"
  >
    <Box as="section" class="prose prose-lg px-4 lg:pl-12 py-12">
      <h1 class="text-current">Street types</h1>
      <p>
        All streets in Portland have a role in fostering, absorbing, and
        sustaining the impacts of a growing city. Portland's Transportation
        System Plan (TSP) includes a “Street Design” classification which
        assigns each street a “type” based on a combination of the
        transportation function and the adjacent land use context. These “Street
        Types” are the foundational element of the StreetsPDX decision-making
        framework.
      </p>
    </Box>
    <Image
      :src="`${publicPath}img/street-type/CivicMainStreet.webp`"
      alt="Photograph of a tractor in a paved roadway next to a curb"
      class="w-full h-full object-cover"
    />
  </Box>
  <main class="max-w-7xl px-4 md:pl-12">
    <section class="flex flex-col gap-8">
      <figure class="prose max-w-none">
        <img
          :src="`${publicPath}img/street-type/Hierarchy_Graph.png`"
          alt="Visualization of how street types compare based on their characteristics and their prevalence."
        />
        <figcaption>
          Street types portray a vision for how the right-of-way should be
          allocated based on city policies. They are also intended to be
          flexible because the context of each street varies greatly throughout
          the city. Each street varies in terms of their transportation needs,
          land use, type of buildings, landscape and natural environment.
        </figcaption>
      </figure>

      <figure class="prose max-w-none">
        <div class="not-prose">
          <ul
            class="flex flex-row gap-2 flex-nowrap overflow-x-auto snap-x snap-mandatory"
            role="region"
            aria-label="Gallery of street types"
            tabindex="0"
          >
            <Card
              as="li"
              :scores="[3, 3, 3, 3]"
              :percentage="0.025"
              class="min-w-fit snap-center"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/CivicMainStreet.webp`"
                  alt="Perspective rendering of a civic main street"
                  title="Perspective rendering of a civic main street"
                />
              </template>
              <h2 class="text-lg">
                <router-link to="/street-types/civic-main-street">
                  <span class="border-b-2 border-current"
                    >Civic Main Streets</span
                  >
                </router-link>
              </h2>
              <p>
                Civic Main Streets are generally Portland's busiest, widest
                streets that pass through compact, pedestrian-oriented Centers
                that anchor neighborhoods with retail and businesses, schools
                and libraries, housing options, employment centers, and
                gathering places.
              </p>
            </Card>
            <Card
              as="li"
              :scores="[2, 3, 3, 2]"
              :percentage="0.02"
              class="min-w-fit snap-center"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/CivicCorridor.webp`"
                  alt="Perspective rendering of a civic corridor"
                  title="Perspective rendering of a civic corridor"
                />
              </template>
              <h2 class="text-lg">
                <router-link to="/street-types/civic-corridor">
                  <span class="border-b-2 border-current">Civic Corridors</span>
                </router-link>
              </h2>
              <p>
                Civic Corridors are generally Portland's busiest, widest, and
                most prominent streets. As the city grows, Civic Corridors are
                increasingly lined with multifamily residential and commercial
                mixed-use developments.
              </p>
            </Card>
            <Card
              as="li"
              :scores="[3, 2, 2, 3]"
              :percentage="0.025"
              class="min-w-fit snap-center"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/NeighborhoodMainStreet.webp`"
                  alt="Perspective rendering of a neighborhood main street"
                  title="Perspective rendering of a neighborhood main street"
                />
              </template>
              <h2 class="text-lg">
                <router-link to="/street-types/neighborhood-main-street">
                  <span class="border-b-2 border-current"
                    >Neighborhood Main Street</span
                  >
                </router-link>
              </h2>
              <p>
                Neighborhood Main Streets are mid-sized streets that pass
                through smaller neighborhood-serving Centers. These centers
                support vibrant business districts and residential buildings,
                bringing amenities, goods, and services within walking distance
                of neighborhood residents.
              </p>
            </Card>
            <Card
              as="li"
              :scores="[2, 2, 2, 2]"
              :percentage="0.02"
              class="min-w-fit snap-center"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/NeighborhoodCorridor.webp`"
                  alt="Perspective rendering of a neighborhood corridor"
                  title="Perspective rendering of a neighborhood corridor"
                />
              </template>
              <h2 class="text-lg">
                <router-link to="/street-types/neighborhood-corridor">
                  <span class="border-b-2 border-current"
                    >Neighborhood Corridors</span
                  >
                </router-link>
              </h2>
              <p>
                Neighborhood Corridors are generally mid-sized streets that
                connect surrounding neighborhoods to each other and with other
                parts of the city. They are zoned to accommodate Portland's
                growth of residential and commercial buildings in the coming
                years, but at a smaller scale than Civic Corridors.
              </p>
            </Card>
            <Card
              as="li"
              :scores="[1, 2, 2, 1]"
              :percentage="0.115"
              class="min-w-fit snap-center"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/CommunityCorridor.webp`"
                  alt="Perspective rendering of a community corridor"
                  title="Perspective rendering of a community corridor"
                />
              </template>
              <h2 class="text-lg">
                <router-link to="/street-types/community-corridor">
                  <span class="border-b-2 border-current"
                    >Community Corridors</span
                  >
                </router-link>
              </h2>
              <p>
                Community Corridors are generally mid-sized streets that connect
                surrounding neighborhoods to each other. Community Corridors are
                not planned for major growth and feature mostly lower-density
                residential land uses, some small-scale retail, and neighborhood
                destinations such as parks and schools.
              </p>
            </Card>
            <Card
              as="li"
              :scores="[1, 1, 1, 1]"
              :percentage="0.77"
              class="min-w-fit snap-center"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/LocalService.webp`"
                  alt="Perspective rendering of a local service street"
                  title="Perspective rendering of a local service street"
                />
              </template>

              <h2 class="text-lg">
                <router-link to="/street-types/local-street">
                  <span class="border-b-2 border-current">Local Streets</span>
                </router-link>
              </h2>
              <p>
                Local streets make up the majority of Portland's streets. These
                are narrower streets that provide access for people and goods
                deliveries to residences and destinations like schools and
                parks.
              </p>
            </Card>
            <Card
              as="li"
              :scores="[2, 2, 3, 2]"
              :percentage="0.02"
              class="min-w-fit snap-center flex"
            >
              <template #header>
                <Image
                  :src="`${publicPath}img/street-type/Industrial.webp`"
                  alt="Perspective rendering of an industrial road"
                  title="Perspective rendering of an industrial road"
                />
              </template>

              <h2 class="text-lg">
                <router-link to="/street-types/industrial-road">
                  <span class="border-b-2 border-current"
                    >Industrial Roads</span
                  >
                </router-link>
              </h2>
              <p>
                Industrial roads serve industrial land uses and provide freight
                connections to regional transportation facilities such as
                interstate and state highways.
              </p>
            </Card>
          </ul>
        </div>
        <figcaption>
          <p>
            The street types identify general design priorities and
            considerations. There is a link for each street type to find more
            information. Scroll through the street types using either your
            mouse, finger, or arrow keys.
          </p>
        </figcaption>
      </figure>
    </section>
  </main>
</template>
