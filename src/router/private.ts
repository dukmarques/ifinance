import type { RouteRecordRaw } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import CardsView from '@/views/CardsView.vue';
import CategoriesView from '@/views/CategoriesView.vue';

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
    },
    {
        path: '/cards',
        name: 'cards',
        component: CardsView,
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoriesView,
    },
];

export default routes.map((route) => {
    const meta = { requiresAuth: true };
    return { ...route, meta };
});
