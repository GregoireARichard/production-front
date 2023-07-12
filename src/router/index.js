import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import QuestionsView from '../views/challenge/QuestionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login/:jwt',
      name: 'login',
      component: LoginView,
      props: (route) => ({ jwt: route.params.jwt }),
    },
    {
      path: '/challenge/questions',
      name: 'questions',
      component: QuestionsView,
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
