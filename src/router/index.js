import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/Coupons.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
