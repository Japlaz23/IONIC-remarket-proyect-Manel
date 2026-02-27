import { createRouter, createWebHashHistory } from '@ionic/vue-router'
import { type RouteRecordRaw } from 'vue-router'
import Tabs from '@/views/Tabs.vue'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Login from '@/views/Login.vue'
import Favorites from '@/views/Favorites.vue'
import Sell from '@/views/Sell.vue'
import Chat from '@/views/Chat.vue'
import ProfileCustomer from '@/views/ProfileCostumer.vue'
import Purchases from '@/views/Purchases.vue'
import Sales from '@/views/Sales.vue'
import Settings from '@/views/Settings.vue'
import PaymentCheck from '@/views/PaymentCheck.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tabs/home',
  },
  {
    path: '/tabs',
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
      {
        path: 'chat',
        name: 'ChatTab',
        component: Chat,
      },
      {
        path: 'purchases',
        name: 'Purchases',
        component: Purchases,
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
    path: '/payment',
    name: 'PaymentCheck',
    component: PaymentCheck,
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
    redirect: '/tabs/chat',
  },
  {
    path: '/chat/:id',
    name: 'ChatThread',
    component: () => import('@/views/ChatConversation.vue'),
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales,
  },
  {
    path: '/purchases',
    name: 'PurchasesPage',
    component: Purchases,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/profile',
    redirect: '/tabs/profile',
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const requiresAuth = (path: string) => {
  return (
    path === '/tabs/favorites' ||
    path === '/tabs/profile' ||
    path === '/tabs/chat' ||
    path === '/tabs/purchases' ||
    path === '/sales' ||
    path === '/purchases' ||
    path === '/settings' ||
    path === '/profile' ||
    path === '/payment' ||
    path.startsWith('/chat')
  )
}

router.beforeEach((to, _from, next) => {
  if (typeof document !== 'undefined') {
    const activeElement = document.activeElement
    if (activeElement instanceof HTMLElement) {
      activeElement.blur()
    }
  }
  const isLoggedIn = !!localStorage.getItem('user')
  if (!isLoggedIn && requiresAuth(to.path)) {
    next('/login')
    return
  }
  next()
})

export default router
