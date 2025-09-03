import axios from 'axios';
import VueAxios from 'vue-axios';
import { useUserStore } from '../stores/user';
import router from '../router/router';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

axios.interceptors.request.use((config) => {
    const userStore = useUserStore();

    config.headers.Authorization = `Bearer ${userStore.accessToken}`;
    return config;
});

axios.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Unauthenticated.') {
        const userStore = useUserStore();
        userStore.clear();
        router.push('/login');
    }
    return Promise.reject(error);
});

export { axios, VueAxios };
