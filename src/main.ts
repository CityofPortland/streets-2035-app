import '@fontsource/merriweather/400.css';
import '@fontsource/merriweather/900.css';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/800.css';
import { createPinia } from 'pinia';
import 'tailwindcss/tailwind.css';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const i18n = createI18n({
  // something vue-i18n options here ...
});
const pinia = createPinia();

createApp(App).use(pinia).use(router).use(i18n).mount('#app');
