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
    path: '/trend/:uid',
    name: 'Trend',
    component: () => import('../views/Trends.vue')
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
    path: '/password-reset/:token',
    name: 'Reset',
    component: () => import('../views/ResetPassword.vue')
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
