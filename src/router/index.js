import { createRouter, createWebHistory } from 'vue-router'
import ProjectDetail from '../components/ProjectDetail.vue'

const routes = [
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/comp4461-personal-portfolio/'),
  routes
})

export default router
