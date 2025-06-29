import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueAxios, axios } from './services/axios';

//TODO: remove soon
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import vuetify from './plugins/vuetify';

import App from './App.vue';
import router from './router/router';

import { PrimeVue, config } from './plugins/primevue';
import './styles.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// TODO: remove soon
app.use(vuetify);

app.use(PrimeVue, config);
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions); //TODO: remove soon

app.mount('#app');
