<script setup lang="ts">
import Box from '@/elements/box/Box';
</script>

<template>
  <article>
    <Box
      as="header"
      color="gray"
      variant="light"
      class="grid grid-cols-1 lg:grid-cols-2"
    >
      <Box as="section" class="prose prose-lg px-4 lg:pl-12 py-12">
        <h1 class="text-current">Training</h1>
        <p>
          The StreetsPDX site has several tools to help users navigate the
          various policies and corresponding design standards that influence
          space in the right-of-way as part of private development and with city
          led capital projects. This page contains resources for navigating and
          successfully utilizing these tools.
        </p>
      </Box>
    </Box>
    <main class="mt-4 mb-8 grid grid-cols-1 gap-4">
      <section class="grid grid-cols-1 lg:grid-cols-2 px-4 lg:pl-12">
        <div class="prose">
          <h2>Video one</h2>
          <p>
            This video provides an overview of the StreetsPDX website and tools.
          </p>
        </div>
        <iframe
          class="w-full h-96"
          src="https://player.vimeo.com/video/815450894?h=91262da591&title=0&byline=0&portrait=0"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>
      <section class="grid grid-cols-1 lg:grid-cols-2 px-4 lg:pl-12">
        <div class="prose">
          <h2>Video two</h2>
          <p>
            The second video describes StreetsPDX tools for understanding
            development related public improvements in the right-of-way.
          </p>
        </div>
        <iframe
          class="w-full h-96"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </section>
      <section class="grid grid-cols-1 lg:grid-cols-2 px-4 lg:pl-12">
        <div class="prose">
          <h2>Video three</h2>
          <p>
            The last video describes the decision-making process and tools that
            support the evaluation of tradeoffs as part of City Projects.
          </p>
        </div>
        <iframe
          class="w-full h-96"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </section>
    </main>
  </article>
</template>
