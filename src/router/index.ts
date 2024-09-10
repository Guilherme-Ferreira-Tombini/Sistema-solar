import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SolarSystem from '../views/SolarSystem.vue'
import centerStar from '@/views/CenterStar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/solar-system',
      name: 'Solar-System',
      component: SolarSystem
    },
    {
      path:'/solar-system-star',
      name: 'Star',
      component: centerStar
    }
  ]
})

export default router
