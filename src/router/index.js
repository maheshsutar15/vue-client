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
    path: '/graph2/:uid/:from/:to',
    name: 'GraphHigh',
    component: () => import('../views/GraphHigh.vue'),
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
