import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n';
import 'tailwindcss/tailwind.css';
import '@fontsource/open-sans';
import '@fontsource/merriweather';

const i18n = createI18n({
  // something vue-i18n options here ...
});

createApp(App).use(store).use(router).use(i18n).mount('#app');
