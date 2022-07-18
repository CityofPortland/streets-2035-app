import { defineComponent, h } from 'vue';
import { useBox } from '@/composables/use-box';

export type BoxColor =
  | 'blue'
  | 'cyan'
  | 'gray'
  | 'green'
  | 'marine'
  | 'orange'
  | 'red'
  | 'tangerine'
  | 'transparent'
  | 'white';

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
  render() {
    const { colorClasses } = useBox(this.color, this.variant);

    return h(
      this.as,
      { class: colorClasses },
      this.$slots.default && this.$slots.default()
    );
  },
});
