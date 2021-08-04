import { defineComponent, h } from 'vue';

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

export default defineComponent({
  props: {
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
  },
  render() {
    const classMap = new Map([
      [
        'blue',
        new Map([
          ['light', ['bg-blue-100', 'text-blue-900']],
          ['neutral', ['bg-blue-500', 'text-blue-100']],
          ['dark', ['bg-blue-900', 'text-blue-100']],
        ]),
      ],
      [
        'cyan',
        new Map([
          ['light', ['bg-cyan-100', 'text-cyan-900']],
          ['neutral', ['bg-cyan-500', 'text-cyan-900']],
          ['dark', ['bg-cyan-900', 'text-cyan-100']],
        ]),
      ],
      [
        'gray',
        new Map([
          ['light', ['bg-gray-100', 'text-gray-900']],
          ['neutral', ['bg-gray-500', 'text-gray-100']],
          ['dark', ['bg-gray-900', 'text-gray-100']],
        ]),
      ],
      [
        'green',
        new Map([
          ['light', ['bg-green-200', 'text-green-900']],
          ['neutral', ['bg-green-500', 'text-green-100']],
          ['dark', ['bg-green-900', 'text-green-100']],
        ]),
      ],
      [
        'orange',
        new Map([
          ['light', ['bg-orange-100', 'text-orange-900']],
          ['neutral', ['bg-orange-500', 'text-orange-900']],
          ['dark', ['bg-orange-900', 'text-orange-100']],
        ]),
      ],
      [
        'red',
        new Map([
          ['light', ['bg-red-200', 'text-red-900']],
          ['neutral', ['bg-red-500', 'text-red-900']],
          ['dark', ['bg-red-900', 'text-red-100']],
        ]),
      ],
      [
        'tangerine',
        new Map([
          ['light', ['bg-tangerine-300', 'text-tangerine-900']],
          ['neutral', ['bg-tangerine-500', 'text-tangerine-900']],
          ['dark', ['bg-tangerine-900', 'text-tangerine-100']],
        ]),
      ],
      [
        'transparent',
        new Map([
          ['light', ['bg-transparent']],
          ['neutral', ['bg-transparent']],
          ['dark', ['bg-transparent']],
        ]),
      ],
    ]);

    const classes = classMap.get(this.color)?.get(this.variant);

    return h(
      this.as,
      { class: classes },
      this.$slots.default && this.$slots.default()
    );
  },
});
