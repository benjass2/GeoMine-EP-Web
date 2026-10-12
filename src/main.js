/**
* @summary Initializes the GeoMine frontend application.
* @author Student Name
*/

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';
import Divider from 'primevue/divider';


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


const components = {
    'pv-button': Button,
    'pv-card': Card,
    'pv-toolbar': Toolbar,
    'pv-select': Select,
    'pv-input-number': InputNumber,
    'pv-checkbox': Checkbox,
    'pv-message': Message,
    'pv-progress-spinner': ProgressSpinner,
    'pv-tag': Tag,
    'pv-divider': Divider
};

Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
});




app.mount('#app');