<template>
  <article>
    <header class="h-96">
      <Box color="blue" class="h-full p-12 flex items-center justify-start">
        <Box
          color="blue"
          variant="dark"
          class="p-8 transform skew-y-1 skew-x-1"
        >
          <h1 class="text-4xl font-bold transform -skew-y-1 -skew-x-1">
            Welcome to
            <abbr title="Portland Bureau of Transportation">PBOT's</abbr>
            Streets 2035 design app!
          </h1>
        </Box>
      </Box>
    </header>
    <main class="max-w-7xl mt-8 px-4 mx-auto">
      <section class="prose">
        <p>
          I'm baby vice twee hella cronut bitters. Heirloom semiotics waistcoat
          gastropub brunch quinoa yr. Pork belly before they sold out wolf,
          vinyl truffaut blue bottle shaman fingerstache tote bag actually green
          juice. Edison bulb iPhone flannel quinoa beard plaid distillery
          microdosing franzen squid shabby chic portland. Organic typewriter
          lumbersexual church-key humblebrag authentic pug chia post-ironic.
          Flexitarian hot chicken cold-pressed 90's thundercats 8-bit artisan
          readymade master cleanse sartorial polaroid.
        </p>
        <p>
          Thundercats snackwave skateboard, hella quinoa green juice venmo
          before they sold out disrupt vice tote bag. Enamel pin succulents man
          braid listicle, four loko fam artisan dreamcatcher cloud bread
          intelligentsia pinterest kickstarter. Yr kombucha selvage twee
          flannel. Raclette single-origin coffee street art kitsch polaroid
          XOXO. Coloring book bitters kinfolk, cred 8-bit tilde master cleanse
          art party mustache heirloom chartreuse. Poke whatever quinoa drinking
          vinegar, plaid twee polaroid XOXO.
        </p>
        <p>
          Cardigan yuccie viral, occupy asymmetrical lomo gentrify chia roof
          party. Keffiyeh twee neutra thundercats PBR&B franzen mixtape raw
          denim. Cronut franzen affogato brunch shaman. Lumbersexual humblebrag
          narwhal affogato bespoke iceland. Lyft ethical tumblr pinterest marfa
          viral.
        </p>
      </section>
    </main>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteLeave } from 'vue-router';

import store from '@/store';

import Box from '@/elements/box/Box';

export default defineComponent({
  name: 'Home',
  components: {
    Box,
  },
  setup() {
    const store = useStore();

    onBeforeRouteLeave(() => {
      store.dispatch('setHeader', { color: 'transparent' });
    });
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      store.dispatch('setHeader', { color: 'blue' });
    });
  },
});
</script>
