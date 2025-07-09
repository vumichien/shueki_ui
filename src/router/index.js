import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import RevenueReportPage from '../pages/RevenueReportPage.vue'
import SystemPage from '../pages/SystemPage.vue'
import SystemRmsPage from '../pages/SystemRmsPage.vue'
import SystemRevenueDefaultPage from '../pages/SystemRevenueDefaultPage.vue'
import AccountPage from '../pages/AccountPage.vue'
import AccountPasswordPage from '../pages/AccountPasswordPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/revenue-report',
    name: 'RevenueReport',
    component: RevenueReportPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/system',
    name: 'System',
    component: SystemPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/system/rms',
    name: 'SystemRms',
    component: SystemRmsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/system/revenue-default',
    name: 'SystemRevenueDefault',
    component: SystemRevenueDefaultPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/account/password',
    name: 'AccountPassword',
    component: AccountPasswordPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    if (isLoggedIn && to.name === 'Login') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})

export default router 