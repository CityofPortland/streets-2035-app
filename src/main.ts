import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n';
import 'tailwindcss/tailwind.css';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/800.css';
import '@fontsource/merriweather/400.css';
import '@fontsource/merriweather/900.css';
import { createPinia } from 'pinia';

const i18n = createI18n({
  // something vue-i18n options here ...
});
const pinia = createPinia();

createApp(App).use(pinia).use(router).use(i18n).mount('#app');
