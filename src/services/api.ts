import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://strapi-ifinances-production.up.railway.app/api/',
    headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
    }
})