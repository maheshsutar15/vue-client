import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/trends/',
    name: 'Trends',
    component: () => import('../views/Trends.vue')
  },
  {
    path: '/graph2/:uid/:from/:to',
    name: 'GraphHigh',
    component: () => import('../views/GraphHigh.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot',
    component: () => import('../views/Forgot.vue')
  },
  {
    path: '/forgot-password-intranet',
    name: 'ForgotIntra',
    component: () => import('../views/ForgotIntra.vue')
  },
  {
    path: '/passwordreset',
    name: 'Reset',
    component: () => import('../views/ResetPassword.vue')
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('../views/Logs.vue')
  },
  {
    path: '/aboutus',
    name: 'About',
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
