import HomeComponent from '@/pages/HomeComponent';
import AboutComponent from '@/pages/AboutComponent';
import AboutApp from '@/pages/AboutApp';
import TaskListComponent from '@/pages/TaskListComponent';
import TaskId from '@/pages/TaskId';
import Error404Component from '@/pages/Error404Component';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent,
    children: [
      {
        path: 'about-app',
        component: AboutApp
      }
    ]
  },
  {
    path: '/tasklist',
    component: TaskListComponent
  },
  {
    path: '/tasklist/:id',
    component: TaskId
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
