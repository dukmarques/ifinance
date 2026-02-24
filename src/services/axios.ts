import axios from 'axios';
import VueAxios from 'vue-axios';


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

// TODO: implementar interceptors para requests e responses

export { axios, VueAxios };