import { createRouter, createWebHistory } from 'vue-router'

// Lazy load all page components for better code splitting
// Add error handling for Vercel compatibility
const LoginPage = () => import('../pages/LoginPage.vue').catch(err => {
  console.error('Failed to load LoginPage:', err)
  return import('../pages/LoginPage.vue')
})
const AdminLoginPage = () => import('../pages/AdminLoginPage.vue').catch(err => {
  console.error('Failed to load AdminLoginPage:', err)
  return import('../pages/AdminLoginPage.vue')
})
const HomePage = () => import('../pages/HomePage.vue').catch(err => {
  console.error('Failed to load HomePage:', err)
  return import('../pages/HomePage.vue')
})
const RevenueReportPage = () => import('../pages/RevenueReportPage.vue').catch(err => {
  console.error('Failed to load RevenueReportPage:', err)
  return import('../pages/RevenueReportPage.vue')
})
const SystemPage = () => import('../pages/SystemPage.vue').catch(err => {
  console.error('Failed to load SystemPage:', err)
  return import('../pages/SystemPage.vue')
})
const SystemOverviewPage = () => import('../pages/SystemOverviewPage.vue').catch(err => {
  console.error('Failed to load SystemOverviewPage:', err)
  return import('../pages/SystemOverviewPage.vue')
})
const SystemRmsPage = () => import('../pages/SystemRmsPage.vue').catch(err => {
  console.error('Failed to load SystemRmsPage:', err)
  return import('../pages/SystemRmsPage.vue')
})
const SystemRevenueDefaultPage = () => import('../pages/SystemRevenueDefaultPage.vue').catch(err => {
  console.error('Failed to load SystemRevenueDefaultPage:', err)
  return import('../pages/SystemRevenueDefaultPage.vue')
})
const AccountPage = () => import('../pages/AccountPage.vue').catch(err => {
  console.error('Failed to load AccountPage:', err)
  return import('../pages/AccountPage.vue')
})
const AccountPasswordPage = () => import('../pages/AccountPasswordPage.vue').catch(err => {
  console.error('Failed to load AccountPasswordPage:', err)
  return import('../pages/AccountPasswordPage.vue')
})
const AdminAccountPasswordPage = () => import('../pages/AdminAccountPasswordPage.vue').catch(err => {
  console.error('Failed to load AdminAccountPasswordPage:', err)
  return import('../pages/AdminAccountPasswordPage.vue')
})
const AdminAccountCreatePage = () => import('../pages/AdminAccountCreatePage.vue').catch(err => {
  console.error('Failed to load AdminAccountCreatePage:', err)
  return import('../pages/AdminAccountCreatePage.vue')
})
const ClientListPage = () => import('../pages/ClientListPage.vue').catch(err => {
  console.error('Failed to load ClientListPage:', err)
  return import('../pages/ClientListPage.vue')
})
const ClientNewPage = () => import('../pages/ClientNewPage.vue').catch(err => {
  console.error('Failed to load ClientNewPage:', err)
  return import('../pages/ClientNewPage.vue')
})

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
  routes,
  // Add fallback for better Vercel compatibility
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
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