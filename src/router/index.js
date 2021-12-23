import { createRouter, createWebHistory } from 'vue-router'
// import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login1',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login2',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../views/OneRoom.vue')
  },
  {
    path: '/parents',
    name: 'Parents',
    component: () => import('../views/Parents.vue')
  },
  {
    path: '/usermanagement',
    name: 'Usermanagement',
    component: () => import('../views/UserManagement.vue')
  },
  {
    path: '/print',
    name: 'Print',
    component: () => import('../views/Print.vue')
  },
  {
    path: '/qrcode',
    name: 'QRCode',
    component: () => import('../views/QRCode.vue')
  },
  // {
  //   path: '*',
  //   component: () => import ('@/views/NotFoundPage.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
