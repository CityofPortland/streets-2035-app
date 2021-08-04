<template>
  <div class="h-full">
    <section class="h-full">
      <div ref="map" class="relative h-full w-full"></div>
    </section>
    <div class="h-full w-full" ref="manual">
      <slot name="manual"></slot>
    </div>
    <div ref="top-left">
      <slot name="top-left">
        <div class="flex flex-col shadow-lg">
          <button
            title="Zoom in"
            class="p-2 bg-white border-2 border-b rounded-t border-fog-900 focus:outline-none focus:shadow-outline"
            v-on:click="incrementZoom"
          >
            <i v-html="feather.icons['plus'].toSvg({ class: 'w-5 h-5' })" />
          </button>
          <button
            title="Zoom out"
            class="p-2 bg-white border-2 border-t rounded-b border-fog-900 focus:outline-none focus:shadow-outline"
            v-on:click="decrementZoom"
          >
            <i v-html="feather.icons['minus'].toSvg({ class: 'w-5 h-5' })" />
          </button>
        </div>
      </slot>
    </div>
    <div ref="top-right">
      <slot name="top-right"></slot>
    </div>
    <div ref="bottom-left">
      <slot name="bottom-left"></slot>
    </div>
    <div ref="bottom-right">
      <slot name="bottom-right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';

import feather from 'feather-icons';
import debounce from 'lodash-es/debounce';

import { whenTrue } from 'esri/core/watchUtils';
import { Extent } from 'esri/geometry';
import MapView from 'esri/views/MapView';
import Legend from 'esri/widgets/Legend';

import { MapState } from '../store/map/types';

export default Vue.extend({
  name: 'Map',

  props: {
    legend: {
      type: Boolean,
      default: true
    },
    layers: {
      type: Array
    }
  },
  data: function() {
    return {
      clickPoint: null,
      displayExtent: {},
      feather,
      selectedGraphic: null,
      showSettings: false,
      showLegend: false
    };
  },
  computed: {
    ...mapState('map', {
      map: (state: MapState) => state.map,
      view: (state: MapState) => state.view,
      extent: (state: MapState) => state.extent,
      zoom: (state: MapState) => state.zoom.current
    })
  },
  watch: {
    layers(newLayers) {
      this.setLayers(newLayers);
    }
  },
  methods: {
    ...mapActions('map', ['setExtent', 'setZoom', 'setLayerVisibility']),
    ...mapMutations('map', ['setView', 'setLayers']),
    initHandlers(view: MapView) {
      view.on('click', (event: __esri.MapViewClickEvent) => {
        this.$emit('click', event);
      });

      view.on('pointer-move', (event: __esri.MapViewPointerMoveEvent) => {
        view.hitTest(event).then((response: __esri.HitTestResult) => {
          this.$emit('pointer-hit', response.results);
        });
      });
    },
    toggleLayerVisibility(id: string, value: boolean) {
      this.setLayerVisibility({ layerId: id, visible: value });
    },
    incrementZoom() {
      this.setZoom({ value: this.zoom + 1, move: true });
    },
    decrementZoom() {
      this.setZoom({ value: this.zoom - 1, move: true });
    }
  },
  mounted: function() {
    const view = new MapView({
      container: this.$refs.map as HTMLDivElement,
      map: this.map,
      extent: this.extent
    });

    view.ui.remove('zoom');

    view.ui.add(this.$refs['top-left'] as HTMLDivElement, {
      position: 'top-left',
      index: 2
    });
    view.ui.add(this.$refs['top-right'] as HTMLDivElement, {
      position: 'top-right',
      index: 2
    });
    view.ui.add(this.$refs['bottom-left'] as HTMLDivElement, {
      position: 'bottom-left',
      index: 2
    });
    view.ui.add(this.$refs['bottom-right'] as HTMLDivElement, {
      position: 'bottom-right',
      index: 2
    });
    view.ui.add(this.$refs['manual'] as HTMLDivElement, {
      position: 'manual',
      index: 2
    });

    if (this.legend) {
      new Legend({
        view,
        container: this.$refs['legend'] as HTMLDivElement
      });
    }

    view.watch(
      'extent',
      debounce((newValue: Extent) => {
        this.setExtent(newValue);
        this.$emit('extent-change', newValue);
      }, 500)
    );

    whenTrue(view, 'stationary', () => {
      if (view.zoom) {
        this.setZoom({ value: view.zoom, move: false });
      }
    });

    this.setView(view);

    this.initHandlers(view);

    this.setLayers(this.layers);
  }
});
</script>

<style lang="scss">
@import url('https://js.arcgis.com/4.13/esri/themes/light/main.css');

.esri-ui {
  @apply text-base;
  .esri-ui-corner {
    .esri-component {
      @apply m-0 shadow-none;
      .esri-widget--panel {
        @apply w-full;
      }
    }
  }
  .esri-ui-manual-container {
    .esri-component {
      @apply pointer-events-none;
    }
  }
  .esri-widget {
    font-family: inherit;
    @apply text-base;
    .esri-legend__service {
      @apply p-2;
    }
    .esri-widget__heading {
      @apply text-base;
    }
    .esri-legend__layer-cell--info {
      @apply text-sm;
    }
  }
}

@media print {
  .esri-ui {
    display: none;
  }

  .esri-view-user-storage {
    display: none;
  }
}
</style>
