import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueAxios, axios } from './services/axios';

import App from './App.vue';
import router from './router/router';

import { configPrimevue } from './plugins/primevue';
import './styles.css';

//TODO: remove soon
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import vuetify from './plugins/vuetify';
//TODO: remove soon

const app = createApp(App);

// TODO: remove soon
app.use(vuetify);
app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions);
// TODO: remove soon

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


configPrimevue(app);
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

app.mount('#app');
