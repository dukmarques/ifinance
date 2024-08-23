import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import publicRoutes from './public';
import privateRoutes from './private';

const routes: Readonly<RouteRecordRaw[]> = publicRoutes.concat(privateRoutes);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

/*router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
});*/

export default router;
