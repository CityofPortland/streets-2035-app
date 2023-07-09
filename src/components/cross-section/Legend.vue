<script setup lang="ts">
import Scorebox from './Scorebox.vue';

const classes = ['w-24', 'h-10'];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2 class="sr-only">Scoring legend</h2>
    <div>
      <h3>Spatial tradeoffs</h3>
      <dl class="mt-4 grid grid-cols-1 gap-1 items-center md:w-50">
        <div class="flex items-center gap-4">
          <dt><Scorebox :score="3" :class="classes" /></dt>
          <dd>Minimal tradeoff</dd>
        </div>
        <div class="flex items-center gap-4">
          <dt><Scorebox :score="2" :class="classes" /></dt>
          <dd>Tradeoff: Analysis required</dd>
        </div>
        <div class="flex items-center gap-4">
          <dt><Scorebox :score="1" :class="classes" /></dt>
          <dd>Not accomodated: Justification required</dd>
        </div>
      </dl>
    </div>
    <div>
      <h3>Policy Priorities</h3>
      <dl class="mt-4 grid grid-cols-1 gap-1 items-center md:w-50">
        <div class="flex items-center gap-4">
          <dt>
            <Scorebox
              color="transparent"
              :score="3"
              priority="lower"
              :class="classes"
            />
          </dt>
          <dd>On network, but not highest priority</dd>
        </div>
        <div class="flex items-center gap-4">
          <dt><Scorebox :score="3" priority="none" :class="classes" /></dt>
          <dd>Not on network</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
