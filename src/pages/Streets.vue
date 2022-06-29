<template>
  <div
    class="flex flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-row"
  >
    <h1 class="sr-only">Street listings</h1>
    <section
      class="w-full sm:w-1/3 md:w-full lg:w-1/3 xl:w-1/4 h-full sm:h-(screen-16) md:h-full lg:h-(screen-16) overflow-y-auto"
    >
      <section v-if="!street" class="p-4 grid grid-cols-1 gap-3">
        <address-suggest @search="handleSearch" />
        <CandidateList :open="showCandidates">
          <Candidate
            v-for="(c, index) in candidates"
            :key="index"
            :candidate="c"
            class="my-1 border rounded-lg shadow"
            @click="handleSelect(c)"
            @keyup.enter="handleSelect(c)"
            @keyup.space="handleSelect(c)"
          />
        </CandidateList>
        <Panel
          icon="cog"
          color="gray"
          variant="light"
          :open="open"
          name="Settings"
          @toggle="open = !open"
        >
          <fieldset class="p-2 grid grid-cols-1 gap-1">
            <div
              v-for="c in classifications"
              :key="c.value"
              class="flex items-center space-x-1"
            >
              <Toggle
                :id="`classification-${c.value.toLowerCase()}`"
                :name="`classification-${c.value.toLowerCase()}`"
                :label="c.label"
                :modelValue="c.enabled"
                @update:modelValue="handleClassificationToggle(c)"
              >
                <label
                  :id="`classification-${c.value.toLowerCase()}-label`"
                  :for="`classification-${c.value.toLowerCase()}`"
                  class="inline-flex items-center space-x-1"
                >
                  <i
                    class="w-5 h-5 border border-current rounded"
                    :style="{ 'background-color': c.symbol.value.formatRgb() }"
                  />
                  <span>{{ c.label }}</span>
                </label>
              </Toggle>
            </div>
            <Toggle
              v-for="d in districts"
              :id="`district-${d.value.toLowerCase()}`"
              :name="`district-${d.value.toLowerCase()}`"
              :key="d.value"
              :label="d.label"
              :modelValue="d.enabled"
              @update:modelValue="handleClassificationToggle(d)"
              class="flex items-center space-x-1"
            >
              <label
                :id="`district-${d.value.toLowerCase()}-label`"
                :for="`district-${d.value.toLowerCase()}`"
                v-if="d.symbol.type == 'image'"
                class="inline-flex items-center space-x-1"
              >
                <img
                  class="w-5 h-5 border border-current rounded"
                  :src="`data:${d.symbol.mime};base64,${d.symbol.value}`"
                />
                <span>{{ d.label }}</span>
              </label>
            </Toggle>
          </fieldset>
        </Panel>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform scale-y-95"
          enter-to-class="transform scale-y-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="transform scale-y-100"
          leave-to-class="transform scale-y-95"
        >
          <Message
            v-if="message"
            :color="message.type == 'Info' ? 'blue' : 'red'"
            variant="light"
            :icon="message.type == 'Info' ? 'information' : 'exclamation'"
          >
            <p>{{ message.message }}</p>
          </Message>
        </transition>
        <ul class="grid grid-cols-1 gap-3">
          <li v-for="street in streets" :key="street.hash">
            <Section
              :street="street"
              @highlight-section="
                highlightStreet({ type: 'section', data: $event })
              "
              @highlight-segment="
                highlightStreet({ type: 'segment', data: $event })
              "
            />
          </li>
        </ul>
      </section>
      <section v-else class="p-4 grid grid-cols-1 gap-3">
        <div>
          <router-link
            :to="{
              name: 'Streets',
              query: {
                extent: [
                  extent.xmin,
                  extent.ymin,
                  extent.xmax,
                  extent.ymax,
                ].join(','),
              },
            }"
            class="inline-flex border-b-2 border-current"
            >Back to search</router-link
          >
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform scale-y-95"
          enter-to-class="transform scale-y-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="transform scale-y-100"
          leave-to-class="transform scale-y-95"
        >
          <Message
            v-if="message"
            :color="message.type == 'Info' ? 'blue' : 'red'"
            variant="light"
            :icon="message.type == 'Info' ? 'information' : 'exclamation'"
          >
            <p>{{ message.message }}</p>
          </Message>
        </transition>
        <Full :street="street" />
      </section>
    </section>
    <MapVue
      id="streets"
      :map="map"
      :extent="extent"
      :center="center"
      :zoom="zoom"
      :options="{
        highlightOptions: {
          color: '#FF9494',
          fillOpacity: 0.8,
          haloColor: '#E65C5C',
          haloOpacity: 1,
        },
      }"
      class="w-full sm:w-2/3 md:w-full lg:w-2/3 xl:w-3/4 h-screen-50 sm:h-(screen-16) md:h-screen-50 lg:h-(screen-16) overflow-y-auto"
      @zoom-change="handleZoom"
      @extent-change="handleExtent"
      @click-hit="handleClick"
      @layer-view="handleLayerView"
      @pointer-hit="handlePointer"
    >
      <template v-slot:top-right>
        <section
          v-if="pointer"
          class="p-2 border border-black rounded-md shadow bg-white overflow-auto flex flex-col"
        >
          <span class="font-semibold text-lg">{{ pointer.name }}</span>
          <span class="text-gray-700">{{
            classificationLabel('design', pointer.classifications?.design)
          }}</span>
        </section>
      </template>
      <template v-slot:bottom-right> </template>
    </MapVue>
  </div>
</template>

<script lang="ts">
import AddressSuggest from '@/components/address-suggest/AddressSuggest.vue';
import { Candidate as TCandidate } from '@/components/address-suggest/candidate';
import Candidate from '@/components/address-suggest/Candidate.vue';
import CandidateList from '@/components/address-suggest/CandidateList.vue';
import MapVue from '@/components/map/Map.vue';
import Message from '@/components/message/Message.vue';
import Panel from '@/components/panel/Panel.vue';
import Full from '@/components/street/Full.vue';
import Section from '@/components/street/Section.vue';
import { Street, StreetSection } from '@/components/street/street';
import { query } from '@/composables/use-graphql';
import { useStreet } from '@/composables/use-street';
import {
  useStreetClassification,
  ViewModel,
} from '@/composables/use-street-classification';
import Toggle from '@/elements/inputs/Toggle.vue';
import Basemap from '@arcgis/core/Basemap';
import { whenFalseOnce } from '@arcgis/core/core/watchUtils';
import Extent from '@arcgis/core/geometry/Extent';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import TileLayer from '@arcgis/core/layers/TileLayer';
import EsriMap from '@arcgis/core/Map';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import LayerView from '@arcgis/core/views/layers/LayerView';
import bbox from '@turf/bbox';
import md5 from 'crypto-js/md5';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

type infoMessage = {
  type: 'Info' | 'Error';
  message: string;
};

const MESSAGES: Record<string, infoMessage> = {
  ZOOM_IN: {
    type: 'Info',
    message: 'You must zoom in further to view listings of streets.',
  },
  ENABLE_CLASSIFICATION: {
    type: 'Info',
    message: 'You must enable a classification to view listings of streets.',
  },
  REFRESHING_STREET_SEGMENTS: {
    type: 'Info',
    message: 'Refreshing street segments...',
  },
  LOADING_STREET: { type: 'Info', message: 'Loading street segment...' },
  UNABLE_TO_CONTACT_SERVER: {
    type: 'Error',
    message: 'Error contacting server, please reload page and try again.',
  },
  ERROR_RETREIVING_STREET: {
    type: 'Error',
    message: 'Error retreiving street(s), please reload page and try again.',
  },
};

export default defineComponent({
  components: {
    AddressSuggest,
    Candidate,
    CandidateList,
    Full,
    MapVue,
    Message,
    Section,
    Panel,
    Toggle,
  },
  setup() {
    const street = ref<Partial<Street> | undefined>(undefined);
    const streets = ref<Array<Partial<StreetSection>>>([]);
    const message = ref<infoMessage | undefined>(undefined);
    const open = ref(true);
    const showCandidates = ref(false);
    const candidates = ref(new Array<TCandidate>());
    const pointer = ref<Partial<Street> | undefined>(undefined);
    const basemap: Basemap = new Basemap({
      baseLayers: [
        'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer',
        'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Buildings/MapServer',
        'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Taxlot_Labels/MapServer',
      ].flatMap((url) => new TileLayer({ url })),
    });
    const layers = [
      new FeatureLayer({
        id: 'districts',
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/28',
      }),
      new FeatureLayer({
        id: 'classifications',
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Planning/MapServer/22',
        outFields: ['*'],
      }),
      new TileLayer({
        url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Labels/MapServer',
      }),
    ];
    const map = new EsriMap({
      basemap,
      layers,
    });
    const center = ref<Partial<Point>>({});
    const zoom = ref(12);
    const layerViews = new Map<string, Promise<FeatureLayerView>>();

    const { push, replace, currentRoute } = useRouter();
    const { models, classificationLabel } = useStreetClassification();
    const { convertStreet, retrieveStreet } = useStreet();

    const districts = computed(() => {
      return models.filter((m) => m.group === 'districts');
    });

    const classifications = computed(() => {
      return models.filter((m) => m.group === 'design');
    });

    const getStreet = async (id: string | string[]) => {
      try {
        const street = await retrieveStreet({
          street: {
            id: Array.isArray(id) ? id.shift() : id,
          },
          classifications: [
            'design',
            'pedestrian',
            'bicycle',
            'transit',
            'freight',
            'emergency',
            'traffic',
          ],
        });
        return street[0];
      } catch (error) {
        message.value = MESSAGES.ERROR_RETREIVING_STREET;
      }
    };

    const extent = computed(() => {
      const q = currentRoute.value.query;

      if (q && q.extent) {
        const extentString = Array.isArray(q.extent)
          ? q.extent.shift()
          : q.extent;

        if (extentString) {
          const [xmin, ymin, xmax, ymax] = extentString
            .split(',')
            .map((s) => parseFloat(s));

          return {
            xmin,
            ymin,
            xmax,
            ymax,
            spatialReference: new SpatialReference({ wkid: 102100 }),
          };
        }
      }

      if (street.value && street.value.geometry) {
        const [xmin, ymin, xmax, ymax] = bbox(street.value.geometry);
        return {
          xmin,
          ymin,
          xmax,
          ymax,
          spatialReference: new SpatialReference({ wkid: 4326 }),
        };
      }

      return {
        spatialReference: new SpatialReference({ wkid: 102100 }),
        xmin: -13674088.5469,
        ymin: 5689892.284199998,
        xmax: -13633591.503800001,
        ymax: 5724489.626800001,
      };
    });

    const createListings = async () => {
      if (extent.value && new Extent(extent.value).width <= 1 * 1000) {
        message.value = MESSAGES.REFRESHING_STREET_SEGMENTS;

        try {
          const s = await retrieveStreet({
            extent: extent.value,
            classifications: ['design', 'bicycle', 'transit'],
          });

          streets.value = [
            ...s
              .filter((x) =>
                classifications.value
                  .filter((c) => c.enabled)
                  .find((c) => c.value == x.classifications.design)
              )
              .reduce<Map<string, StreetSection>>((acc, curr) => {
                const hash = md5(
                  `${curr.name}:${curr.classifications.design}:${curr.classifications.bicycle}:${curr.classifications.transit}`
                ).toString();
                if (acc.has(hash)) {
                  const section = acc.get(hash);
                  if (section) {
                    section.segments.push(curr);
                    section.minWidth = Math.min(
                      section.minWidth || curr.width,
                      curr.width
                    );
                    section.maxWidth = Math.max(
                      section.maxWidth || curr.width,
                      curr.width
                    );
                  }
                } else {
                  acc.set(hash, {
                    hash,
                    segments: [curr],
                    minWidth: curr.width,
                    maxWidth: curr.width,
                    ...curr,
                  });
                }
                return acc;
              }, new Map())
              .values(),
          ]
            .sort((a, b) =>
              a.name.localeCompare(b.name, undefined, {
                sensitivity: 'base',
              })
            )
            .map((s) => {
              s.segments = s.segments.sort(
                (a, b) => (a.block || 0) - (b.block || 0)
              );
              return s;
            });

          if (!streets.value.length) {
            message.value = MESSAGES.ENABLE_CLASSIFICATION;
          } else {
            message.value = undefined;
          }
        } catch (error) {
          message.value = MESSAGES.ERROR_RETREIVING_STREET;
        }
      } else {
        streets.value = [];
        message.value = MESSAGES.ZOOM_IN;
      }
    };

    let highlight: { remove: () => void };

    const highlightStreet = async (options: {
      type: 'section' | 'segment';
      data: Partial<StreetSection> | Partial<Street>;
    }) => {
      const layerView = await layerViews.get('classifications');
      if (layerView) {
        whenFalseOnce(layerView, 'updating', () => {
          const query = layerView.layer.createQuery();
          const where =
            options.type == 'segment'
              ? `('${(options.data as Street).id}')`
              : `(${(options.data as StreetSection).segments.reduce(
                  (acc, curr, idx) => {
                    if (idx > 0) acc = acc.concat(',');
                    acc = acc.concat(`'${curr.id}'`);
                    return acc;
                  },
                  ''
                )})`;
          query.where = `TranPlanID IN ${where}`;
          layerView.queryFeatures(query).then((result) => {
            if (highlight) {
              highlight.remove();
            }
            highlight = layerView.highlight(result.features);
          });
        });
      }
    };

    const setupFeatureFilter = async () => {
      let layerView = await layerViews.get('classifications');
      if (layerView) {
        layerView.filter = new FeatureFilter({
          where: `Design in (${classifications.value
            .filter((c) => c.enabled)
            .map((c) => `'${c.value}'`)
            .join(',')})`,
        });
      }

      layerView = await layerViews.get('districts');
      if (layerView) {
        layerView.visible = districts.value[0].enabled || false;
      }
    };

    onMounted(async () => {
      setupFeatureFilter();
      if (currentRoute.value.params.id) {
        message.value = MESSAGES.LOADING_STREET;
        street.value = await getStreet(currentRoute.value.params.id);
        if (street.value) {
          highlightStreet({ type: 'segment', data: street.value });
          message.value = undefined;
        }
      }
    });

    onBeforeRouteUpdate(async (to) => {
      if (to.params.id) {
        message.value = MESSAGES.LOADING_STREET;
        street.value = await getStreet(to.params.id);
        if (street.value) {
          highlightStreet({ type: 'segment', data: street.value });
          message.value = undefined;
        } else {
          return false;
        }
      } else {
        street.value = undefined;
        if (highlight) {
          highlight.remove();
        }
      }
    });

    return {
      street,
      streets,
      message,
      open,
      candidates,
      showCandidates,
      map,
      extent,
      center,
      zoom,
      classifications,
      districts,
      pointer,
      classificationLabel,
      highlightStreet,
      handleLayerView: (data: { id: string; promise: Promise<LayerView> }) => {
        layerViews.set(data.id, data.promise as Promise<FeatureLayerView>);
      },
      async handleClassificationToggle(model: ViewModel) {
        const predicate = (m: ViewModel) =>
          m.value === model.value && m.group === model.group;

        let m = classifications.value.find(predicate);
        if (m) m.enabled = !m.enabled;

        m = districts.value.find(predicate);
        if (m) m.enabled = !m.enabled;

        setupFeatureFilter();

        createListings();
      },
      async handleSearch({
        query: q,
        type,
      }: {
        query: string;
        type: 'address' | 'taxlot';
      }) {
        try {
          const { data } = await query<{
            [index: string]: Array<TCandidate>;
          }>(`
          {
            ${type}(search:"${q}", city:"portland") {
              id
              type
              name
              location {
                x
                y
                spatialReference {
                  wkid
                  latestWkid
                }
              }
              city
              state
            }
          }`);

          if (data && data[type]) {
            candidates.value = data[type];
            showCandidates.value = true;
          } else {
            message.value = {
              type: 'Error',
              message: `Could not find a match for '${q}'. Please try a different search.`,
            };
          }
        } catch (error) {
          message.value = MESSAGES.UNABLE_TO_CONTACT_SERVER;
        }
      },
      handleSelect(candidate: TCandidate) {
        showCandidates.value = false;
        // move map to location
        center.value = candidate.location;
      },
      handleZoom(z: number) {
        zoom.value = z;
      },
      handleExtent(extent: Extent) {
        const { xmin, ymin, xmax, ymax } = extent;

        const f = currentRoute.value.params.id ? replace : push;

        f({
          ...currentRoute.value,
          query: {
            ...currentRoute.value.query,
            extent: [xmin, ymin, xmax, ymax].join(','),
          },
        });

        createListings();
      },
      handleClick(event: Array<{ graphic: { attributes: unknown } }>) {
        const street = convertStreet(
          'esri',
          event[0].graphic.attributes
        ) as Partial<Street>;
        if (street) push({ name: 'Streets', params: { id: street.id } });
      },
      handlePointer(event: Array<{ graphic: { attributes: unknown } }>) {
        if (event && event.length > 0) {
          pointer.value = convertStreet(
            'esri',
            event[0].graphic.attributes
          ) as Partial<Street>;
        } else {
          pointer.value = undefined;
        }
      },
    };
  },
});
</script>
