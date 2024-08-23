import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Auth/LoginView.vue';
import Register from '@/views/Auth/RegisterView.vue';

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    }
];

export default routes.map(route => {
    const meta = { requiresAuth: false };
    return { ...route, meta };
});