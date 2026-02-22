// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'), // Lazy load
  },

  // Ejemplo de rutas comentadas listas para usar:
  // {
  //   path: '/favorites',
  //   name: 'Favorites',
  //   component: () => import('@/views/Favorites.vue'),
  // },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: () => import('@/views/Cart.vue'),
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: () => import('@/views/Settings.vue'),
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/Login.vue'),
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('@/views/Register.vue'),
  // },
  // {
  //   path: '/restorepassword',
  //   name: 'RestorePassword',
  //   component: () => import('@/views/RestorePassword.vue'),
  // },
  // {
  //   path: '/product/:id',
  //   name: 'ProductDetail',
  //   component: () => import('@/views/ProductDetail.vue'),
  // },
  // {
  //   path: '/purchases',
  //   name: 'Purchases',
  //   component: () => import('@/views/Purchases.vue'),
  // },
  // {
  //   path: '/profilecustomer',
  //   name: 'ProfileCustomer',
  //   component: () => import('@/views/ProfileCostumer.vue'),
  // },
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   component: () => import('@/views/Chat.vue'),
  // },
  // {
  //   path: '/chat/:id',
  //   name: 'ChatThread',
  //   component: () => import('@/views/ChatConversation.vue'),
  // },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: () => import('@/views/Search.vue'),
  // },
  // {
  //   path: '/sell',
  //   name: 'Sell',
  //   component: () => import('@/views/Sell.vue'),
  // },
  // {
  //   path: '/sales',
  //   name: 'Sales',
  //   component: () => import('@/views/Sales.vue'),
  // },
  // {
  //   path: '/payment',
  //   name: 'PaymentCheck',
  //   component: () => import('@/views/PaymentCheck.vue'),
  // },
  // {
  //   path: '/tabs',
  //   name: 'Tabs',
  //   component: () => import('@/views/Tabs.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;