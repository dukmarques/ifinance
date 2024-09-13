import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import publicRoutes from './public';
import privateRoutes from './private';
import { useUserStore } from '../stores/user';

const routes: Readonly<RouteRecordRaw[]> = publicRoutes.concat(privateRoutes);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const userStore = useUserStore();

    if (requiresAuth && (!userStore.accessToken || userStore.accessToken === '')) {
        next('/login');
    } else if ((to.name === 'login' || to.name === 'register') && (userStore.accessToken != null && userStore.accessToken !== '')) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
