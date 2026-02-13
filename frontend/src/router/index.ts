import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Tabs from '@/views/Tabs.vue'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Login from '@/views/Login.vue'
import Favorites from '@/views/Favorites.vue'
import Sell from '@/views/Sell.vue'
import ProfileCustomer from '@/views/ProfileCostumer.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tabs/home',
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: Favorites,
      },
      {
        path: 'sell',
        name: 'Sell',
        component: Sell,
      },
      {
        path: 'profile',
        name: 'ProfileCustomer',
        component: ProfileCustomer,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/restorepassword',
    name: 'RestorePassword',
    component: () => import('@/views/RestorePassword.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
  },
  {
    path: '/sell',
    redirect: '/tabs/sell',
  },
  {
    path: '/favorites',
    redirect: '/tabs/favorites',
  },
  {
    path: '/profilecustomer',
    redirect: '/tabs/profile',
  },
  {
    path: '/chat',
    redirect: '/tabs/home',
  },
  {
    path: '/chat/:id',
    name: 'ChatDetail',
    component: () => import('@/views/Chat.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
