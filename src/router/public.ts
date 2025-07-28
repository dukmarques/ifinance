import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Auth/LoginView.vue';
import Register from '@/views/Auth/RegisterView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/home',
        redirect: '/',
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
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: NotFoundView,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found',
    },
];

export default routes.map((route) => {
    const meta = { requiresAuth: false };
    return { ...route, meta };
});
