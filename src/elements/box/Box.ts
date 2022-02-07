import { defineComponent, h } from 'vue';

import { useBox } from '@/composables/use-box';

export type BoxColor =
  | 'blue'
  | 'cyan'
  | 'gray'
  | 'green'
  | 'orange'
  | 'red'
  | 'tangerine'
  | 'transparent';

export type BoxColorVariant = 'light' | 'neutral' | 'dark';

export interface ColorProps {
  color: BoxColor;
  variant: BoxColorVariant;
}

export interface BoxProps {
  as: string;
}

export const BoxProps = {
  as: {
    type: String,
    default: 'div',
  },
  color: {
    type: String as () => BoxColor,
    default: 'transparent',
  },
  variant: {
    type: String as () => BoxColorVariant,
    default: 'neutral',
  },
};

export default defineComponent({
  props: BoxProps,
  setup(props, { slots }) {
    const { colorClasses } = useBox(props.color, props.variant);

    return () =>
      h(
        props.as,
        { class: colorClasses.value },
        slots.default && slots.default()
      );
  },
});
