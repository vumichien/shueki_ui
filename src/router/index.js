import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import AdminLoginPage from '../pages/AdminLoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import RevenueReportPage from '../pages/RevenueReportPage.vue'
import SystemPage from '../pages/SystemPage.vue'
import SystemOverviewPage from '../pages/SystemOverviewPage.vue'
import SystemRmsPage from '../pages/SystemRmsPage.vue'
import SystemRevenueDefaultPage from '../pages/SystemRevenueDefaultPage.vue'
import AccountPage from '../pages/AccountPage.vue'
import AccountPasswordPage from '../pages/AccountPasswordPage.vue'
import AdminAccountPasswordPage from '../pages/AdminAccountPasswordPage.vue'
import AdminAccountCreatePage from '../pages/AdminAccountCreatePage.vue'
import ClientListPage from '../pages/ClientListPage.vue'
import ClientNewPage from '../pages/ClientNewPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginPage
  },
  {
    path: '/admin/system-overview',
    name: 'AdminSystemOverview',
    component: SystemOverviewPage,
    meta: { requiresAdminAuth: true }
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
  },
  {
    path: '/admin/clients',
    name: 'AdminClients',
    component: ClientListPage,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/clients/new',
    name: 'AdminClientNew',
    component: ClientNewPage,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/account/password',
    name: 'AdminAccountPassword',
    component: AdminAccountPasswordPage,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/account/new',
    name: 'AdminAccountCreate',
    component: AdminAccountCreatePage,
    meta: { requiresAdminAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'
  
  // Check for admin routes
  if (to.matched.some(record => record.meta.requiresAdminAuth)) {
    if (!isAdminLoggedIn) {
      next({ name: 'AdminLogin' })
    } else {
      next()
    }
  }
  // Check for user routes
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } 
  // Handle login redirects
  else {
    if (isAdminLoggedIn && to.name === 'AdminLogin') {
      next({ name: 'AdminSystemOverview' })
    } else if (isLoggedIn && to.name === 'Login') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})

export default router 