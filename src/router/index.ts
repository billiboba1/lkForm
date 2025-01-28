import { createRouter, createWebHistory } from 'vue-router'
import LkFormPage from '@/pages/lkFormsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LkFormPage,
    },
  ],
})

export default router
