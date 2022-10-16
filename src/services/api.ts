import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
    }
})