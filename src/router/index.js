import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import QuestionsView from '../views/challenge/QuestionsView.vue'
import AdminView from '../views/AdminView.vue'
import DashboardView from '../views/admin/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/challenge/questions',
      name: 'questions',
      component: QuestionsView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.name}`)
  next()
})

export default router
