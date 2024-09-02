import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ConvertPage from '@/views/ConvertPage.vue';

const base = import.meta.env.MODE === 'production' ? '/currency-converter/' : '/';

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/convert',
      name: 'convert',
      component: ConvertPage
    }
  ]
})

export default router
