<template>
  <div class="h-full">
    <section class="h-full">
      <div ref="mapElement" class="relative h-full w-full"></div>
    </section>
    <div class="h-full w-full" ref="manual">
      <slot name="manual"></slot>
    </div>
    <div ref="topLeft">
      <slot name="top-left">
        <div class="flex flex-col shadow-lg">
          <button
            title="Zoom in"
            class="
              p-2
              bg-white
              border-2 border-b
              rounded-t
              border-fog-900
              focus:outline-none focus:shadow-outline
            "
            v-on:click="incrementZoom"
          >
            <Icon type="plus" class="w-4 h-4" />
          </button>
          <button
            title="Zoom out"
            class="
              p-2
              bg-white
              border-2 border-t
              rounded-b
              border-fog-900
              focus:outline-none focus:shadow-outline
            "
            v-on:click="decrementZoom"
          >
            <Icon type="minus" class="w-4 h-4" />
          </button>
        </div>
      </slot>
    </div>
    <div ref="topRight">
      <slot name="top-right"></slot>
    </div>
    <div ref="bottomLeft">
      <slot name="bottom-left"></slot>
    </div>
    <div ref="bottomRight">
      <slot name="bottom-right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue';

import debounce from 'lodash-es/debounce';

import { whenTrue } from '@arcgis/core/core/watchUtils';
import Extent from '@arcgis/core/geometry/Extent';
import EsriMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Legend from '@arcgis/core/widgets/Legend';

import Icon from '@/elements/icon/Icon.vue';

export default defineComponent({
  name: 'Map',
  components: { Icon },
  props: {
    map: {
      type: Object as () => EsriMap,
      required: true,
    },
    extent: {
      type: Object as () => Extent,
      required: true,
    },
    zoom: {
      type: Number,
      default: 12,
    },
    legend: {
      type: Boolean,
      default: false,
    },
    layers: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const mapElement = ref<HTMLDivElement>();
    const topLeft = ref<HTMLDivElement>();
    const topRight = ref<HTMLDivElement>();
    const bottomLeft = ref<HTMLDivElement>();
    const bottomRight = ref<HTMLDivElement>();
    const manual = ref<HTMLDivElement>();
    const legendElement = ref<HTMLDivElement>();

    let view: MapView;

    const { extent, zoom } = toRefs(props);

    onMounted(() => {
      view = new MapView({
        container: mapElement.value,
        map: props.map,
        extent: new Extent(extent.value),
        zoom: props.zoom,
      });

      view.ui.remove('zoom');

      view.ui.add(topLeft.value as HTMLDivElement, {
        position: 'top-left',
        index: 2,
      });
      view.ui.add(topRight.value as HTMLDivElement, {
        position: 'top-right',
        index: 2,
      });
      view.ui.add(bottomLeft.value as HTMLDivElement, {
        position: 'bottom-left',
        index: 2,
      });
      view.ui.add(bottomRight.value as HTMLDivElement, {
        position: 'bottom-right',
        index: 2,
      });
      view.ui.add(manual.value as HTMLDivElement, {
        position: 'manual',
        index: 2,
      });

      if (props.legend) {
        new Legend({
          view,
          container: legendElement.value,
        });
      }

      view.watch(
        'extent',
        debounce((newValue: Extent) => {
          emit('extent-change', newValue);
        }, 500)
      );

      whenTrue(view, 'stationary', () => {
        if (view.zoom) {
          emit('zoom-change', view.zoom);
        }
      });

      view.on('click', (event) => {
        emit('click', event);
      });

      view.on('pointer-move', (event) => {
        view.hitTest(event).then((response) => {
          emit('pointer-hit', response.results);
        });
      });
    });

    watch(extent, () => {
      view.goTo(new Extent(extent.value));
    });

    watch(zoom, () => {
      view.goTo({
        center: view.center,
        zoom: zoom.value,
      });
    });

    return {
      mapElement,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      manual,
      legendElement,
      incrementZoom() {
        emit('zoom-change', Math.min(20, zoom.value + 1));
      },
      decrementZoom() {
        emit('zoom-change', Math.max(5, zoom.value - 1));
      },
    };
  },
});
</script>

<style>
@import url('https://js.arcgis.com/4.20/esri/themes/light/main.css');

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
