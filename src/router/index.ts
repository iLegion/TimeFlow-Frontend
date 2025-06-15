import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import useUserApi from '@/api/user.http.ts'
import HomeView from '../views/HomeView.vue'
import AuthView from "../views/AuthView.vue";
import SettingsView from "../views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const userStore = useUserStore()
  const userApi = useUserApi()

  let token = localStorage.getItem('token')

  if (!token && to.name === 'auth') {
    token = to.query.token as string | null

    if (token) localStorage.setItem('token', token)
  }

  if (token) {
    if (userStore.user) {
      return true
    } else {
      try {
        const response = await userApi.me()

        if (response && response.data) {
          userStore.setUser(response.data)
        }

        if (to.name === 'auth') return { name: 'home' }

        return true
      } catch (e) {
        localStorage.removeItem('token')
        userStore.setUser(null)
        console.error(e)

        if (to.meta.requiresAuth) return { name: 'auth' }

        return true
      }
    }
  } else {
    if (to.meta.requiresAuth && to.name !== 'auth') return { name: 'auth' }

    return true;
  }
})

export default router
