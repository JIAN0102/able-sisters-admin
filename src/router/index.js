import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/frontend/layout/Layout.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/backend/layout/Layout.vue'),
    children: [
      {
        path: 'products',
        name: 'adminProducts',
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
