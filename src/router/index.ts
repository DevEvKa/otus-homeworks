import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/Catalog.vue')
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/AdminPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((nav) => nav.meta.requiresAuth) && !useAuthStore().isLogged) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
