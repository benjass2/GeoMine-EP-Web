/**
* @summary Initializes the GeoMine frontend application.
* @author Student Name
*/

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';



import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import App from './app.vue';

import i18n from './shared/i18n/index.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            darkModeSelector: false
        }
    }
});




app.mount('#app');