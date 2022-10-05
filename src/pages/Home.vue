<template>
  <article>
    <header>
      <figure class="prose max-w-none">
        <Image class="w-full" :src="`${publicPath}img/home/hero.webp`" />
        <figcaption class="italic px-4">
          An image that shows the responsibilities for setting policies,
          standards and design guidelines for the variety of uses for the
          right-of-way. It shows a fictional street corridor with areas filled
          with colors that representwho is responsible for each area or item.
        </figcaption>
      </figure>
    </header>
    <main class="max-w-7xl px-4 mx-auto my-8 prose">
      <h1>
        Welcome to
        <abbr title="Portland Bureau of Transportation">PBOT's</abbr>
        Street Design Framework!
      </h1>
      <p>
        The Street Design Framework is intended to support policy implementation
        and decision-making in the right-of-way consistent with the City's 2035
        Comprehensive Plan. It brings together the various policies and
        corresponding design standards that influence space in the right-of-way
        as part of private development and with city led capital projects.
        Because individual sites and projects in constrained urban environments
        can vary in their challenges and opportunities, the framework also
        identifies the deviation processes that provide flexibility when it is
        not possible to meet all applicable standards.
      </p>
      <p>
        This site is a tool for helping users navigate the framework. It has
        several informational sections described below:
      </p>
      <ul>
        <li>
          <p>
            <router-link to="/street-types" v-slot="{ href, navigate }"
              ><Anchor :url="href" @click="navigate"
                >Street Types pages</Anchor
              ></router-link
            >
            identify general design priorities and considerations for different
            types of streets. The role that each street plays in the city is
            related to its transportation function and the adjacent land use
            context. The functional needs of a given street type informs
            decision-making with both private development and capital projects.
          </p>
        </li>
        <li>
          <p>
            <router-link to="/public-improvements" v-slot="{ href, navigate }"
              ><Anchor :url="href" @click="navigate"
                >A Public Improvements page</Anchor
              ></router-link
            >
            allows users to visualize the different standards that may apply to
            their development project, with links to available deviation
            processes and a more detailed page of city standards, guidelines and
            requirements that impact space in right-of-way.
          </p>
        </li>
        <li>
          <p>
            <router-link to="/captial-projects" v-slot="{ href, navigate }"
              ><Anchor :url="href" @click="navigate"
                >A Capital Projects page</Anchor
              ></router-link
            >
            describes a framework for evaluating policy tradeoffs when working
            to determine the appropriate cross-section for a street.
          </p>
        </li>
      </ul>
      <p>
        This site also contains interactive elements to help users understand
        what street design policies might apply to their projects. These
        portions of the site are described below:
      </p>
      <ul>
        <li>
          <p>
            <router-link to="/streets" v-slot="{ href, navigate }"
              ><Anchor :url="href" @click="navigate">A map</Anchor></router-link
            >
            identifies the road width and various policy designations for each
            street. Use the map to navigate to your area of interest. You may
            then browse that information on each street segment within that
            area. If a street section has applicable cross-sections, they will
            be linked from their information.
          </p>
        </li>
        <li>
          <p>
            <router-link to="/cross-section" v-slot="{ href, navigate }"
              ><Anchor :url="href" @click="navigate"
                >A cross-section viewer</Anchor
              ></router-link
            >
            shows typical street section images for Portland's most common
            roadway widths. Use this to identify what tradeoffs each type of
            roadway layout has.
          </p>
        </li>
      </ul>
    </main>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import { useHeaderStore } from '@/store/header';

import Anchor from '@/elements/anchor/Anchor.vue';
import Image from '@/elements/img/Image.vue';

export default defineComponent({
  name: 'Home',
  components: { Anchor, Image },
  setup() {
    onBeforeRouteLeave(() => {
      const store = useHeaderStore();
      store.setHeader({ color: 'transparent' });
    });

    return { publicPath: process.env.BASE_URL };
  },
  beforeRouteEnter(_to, _from, next) {
    next(() => {
      const store = useHeaderStore();
      store.setHeader({ color: 'blue' });
    });
  },
});
</script>
