import type { RouteRecordRaw } from 'vue-router';
import OverviewView from '@/views/OverviewView.vue';

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/overview',
        name: 'overview',
        component: OverviewView,
    },
];

export default routes.map(route => {
    const meta = { requiresAuth: true };
    return { ...route, meta };
});