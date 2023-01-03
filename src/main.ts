import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';
import { createPinia } from 'pinia';
import 'tailwindcss/tailwind.css';
import { createApp } from 'vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
