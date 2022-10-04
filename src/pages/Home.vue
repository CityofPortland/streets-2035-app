<template>
  <article class="max-w-7xl px-4 mx-auto my-8">
    <header class="prose-lg">
      <h1>Introduction</h1>
      <p class="lead">
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
      <figure>
        <img class="w-full" :src="`${publicPath}img/home/hero.png`" />
        <figcaption class="italic">
          An image that shows the responsibilities for setting policies,
          standards and design guidelines for the variety of uses for the
          right-of-way.
        </figcaption>
      </figure>
    </header>
    <main class="prose">
      <p>
        <router-link to="/street-types" v-slot="{ href, navigate }"
          ><Anchor :url="href" @click="navigate"
            >Street Types pages</Anchor
          ></router-link
        >
        identify general design priorities and considerations for different
        types of streets. The role that each street plays in the city is related
        to its transportation function and the adjacent land use context. The
        functional needs of a given street type informs decision-making with
        both private development and capital projects.
      </p>
      <p>
        <router-link to="/public-improvements" v-slot="{ href, navigate }"
          ><Anchor :url="href" @click="navigate"
            >A Public Improvements page</Anchor
          ></router-link
        >
        allows users to visualize the different standards that may apply to
        their development project, with links to available deviation processes
        and a more detailed page of city standards, guidelines and requirements
        that impact space in right-of-way.
      </p>
      <p>
        <router-link to="/captial-projects" v-slot="{ href, navigate }"
          ><Anchor :url="href" @click="navigate"
            >A Capital Projects page</Anchor
          ></router-link
        >
        describes a framework for evaluating policy tradeoffs when working to
        determine the appropriate cross-section for a street. A Map identifies
        the road width and various policy designations for each street. Typical
        Street Sections are available for Portland's most common roadway widths.
      </p>
    </main>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import { useHeaderStore } from '@/store/header';

import Anchor from '@/elements/anchor/Anchor.vue';

export default defineComponent({
  name: 'Home',
  components: { Anchor },
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
