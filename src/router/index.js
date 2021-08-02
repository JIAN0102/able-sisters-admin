import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/frontend/Home.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/frontend/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/backend/Admin.vue'),
    children: [
      {
        path: 'products',
        name: 'DashboardProducts',
        component: () => import('@/views/backend/Products.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
