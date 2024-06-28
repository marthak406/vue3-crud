import { createRouter, createWebHistory } from 'vue-router';

//define a routes
const routes = [
        {
            path: '/',
            name: 'home',
            component: () =>
                import( /* webpackChunkName: "Auth" */ "../views/home/Index.vue"),
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import( /* webpackChunkName: "Auth" */ "../views/auth/Index.vue"),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () =>
                import( /* webpackChunkName: "Auth" */ "../views/dashboard/Index.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: '/posts',
            name: 'posts.index',
            component: () => import( /* webpackChunkName: "index" */ '../views/posts/index.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/create',
            name: 'posts.create',
            component: () => import( /* webpackChunkName: "create" */ '../views/posts/create.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/edit/:id',
            name: 'posts.edit',
            component: () => import( /* webpackChunkName: "edit" */ '../views/posts/edit.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/users',
            name: 'users.index',
            component: () => import( /* webpackChunkName: "index" */ '../views/users/index.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: () => import( /* webpackChunkName: "create" */ '../views/users/create.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/users/edit/:id',
            name: 'users.edit',
            component: () => import( /* webpackChunkName: "edit" */ '../views/users/edit.vue'),
            meta: { requiresAuth: true },
        },
    ]

//create router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
});

export default router