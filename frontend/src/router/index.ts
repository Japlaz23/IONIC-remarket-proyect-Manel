import { createRouter, createWebHashHistory } from '@ionic/vue-router'
import { type RouteRecordRaw } from 'vue-router'
import Tabs from '../../../frontend-refactor/src/views/Tabs.vue'
import Home from '@/views/Home.vue'
import Search from '../../../frontend-refactor/src/views/Search.vue'
import Login from '../../../frontend-refactor/src/views/Login.vue'
import Favorites from '../../../frontend-refactor/src/views/Favorites.vue'
import Sell from '../../../frontend-refactor/src/views/Sell.vue'
import Chat from '@/views/Chat.vue'
import ProfileCustomer from '../../../frontend-refactor/src/views/ProfileCostumer.vue'
import Purchases from '../../../frontend-refactor/src/views/Purchases.vue'
import Sales from '../../../frontend-refactor/src/views/Sales.vue'
import Settings from '../../../frontend-refactor/src/views/Settings.vue'
import PaymentCheck from '../../../frontend-refactor/src/views/PaymentCheck.vue'

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
    component: () => import('../../../frontend-refactor/src/views/Register.vue'),
  },
  {
    path: '/restorepassword',
    name: 'RestorePassword',
    component: () => import('../../../frontend-refactor/src/views/RestorePassword.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../../../frontend-refactor/src/views/ProductDetail.vue'),
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
    component: () => import('../../../frontend-refactor/src/views/ChatConversation.vue'),
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
