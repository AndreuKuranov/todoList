import HomeComponent from '@/pages/HomeComponent';
import AboutComponent from '@/pages/AboutComponent';
import TaskListComponent from '@/pages/TaskListComponent';
import Error404Component from '@/pages/Error404Component';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '/tasklist',
    component: TaskListComponent
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error404Component
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;
