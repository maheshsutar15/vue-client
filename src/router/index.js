import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Welcome.vue'),
    meta: {
      footer: true,
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/trends/',
    name: 'Trends',
    component: () => import('../views/Trends.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/graph/:uid/:from/:to',
    name: 'Graph',
    component: () => import('../views/Graph.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      footer: true,
    }
  },
  {
    path: '/table/:uid/:from/:to',
    name: 'NodeTable',
    component: () => import('../views/Table.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/forgot-password',
    name: 'Forgot',
    component: () => import('../views/Forgot.vue'),
    meta: {
      footer: true,
    }
  },
  {
    path: '/forgot-password-intranet',
    name: 'ForgotIntra',
    component: () => import('../views/ForgotIntra.vue'),
    meta: {
      footer: true,
    }
  },
  {
    path: '/passwordreset',
    name: 'Reset',
    component: () => import('../views/ResetPassword.vue'),
    meta: {
      footer: true,
    }
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: () => import('../views/ManageUsers.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('../views/Logs.vue'),
    meta: {
      footer: false,
    }
  },
  {
    path: '/aboutus',
    name: 'About',
    component: () => import('../views/AboutUs.vue'),
    meta: {
      footer: true,
    }
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../views/NotFound.vue'),
    meta: {
      footer: true,
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
