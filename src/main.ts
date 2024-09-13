/* eslint-disable import/extensions */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { VueAxios, axios } from './services/axios';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions);

app.mount('#app');
