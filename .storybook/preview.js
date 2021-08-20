import './tailwind.css';
import '@fontsource/open-sans';
import '@fontsource/merriweather';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


export const decorators = [(story) => ({
  components: { story },
  template: '<div class="font-sans"><story /></div>'
})];
