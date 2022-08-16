import HomeComponent from '@/pages/HomeComponent';
import AboutComponent from '@/pages/AboutComponent';
import AboutApp from '@/pages/AboutApp';
import TaskListComponent from '@/pages/TaskListComponent';
import TaskId from '@/pages/TaskId';
import Error404Component from '@/pages/Error404Component';
import { createRouter, createWebHistory } from 'vue-router';

const isAuthorized = (val) => JSON.parse(localStorage.getItem(val));

const managwrAuthGuard = function (to, from, next) {
  let registrationStatus = isAuthorized('registration') ? isAuthorized('registration').registrationStatus : false

  if (!registrationStatus) {
    next('/')
  } else {
    next()
  };
}

const routes = [
  {
    path: '/',
    component: HomeComponent,
    name: 'HomeComponent',
    
  },
  {
    path: '/about',
    component: AboutComponent,
    name: 'AboutComponent',
    children: [
      {
        path: 'about-app',
        component: AboutApp,
        name: 'AboutApp'
      }
    ]
  },
  {
    path: '/tasklist',
    component: TaskListComponent,
    name: 'TaskListComponent',
    beforeEnter: managwrAuthGuard
  },
  {
    path: '/tasklist/:id',
    component: TaskId,
    name: 'TaskId',
    beforeEnter: managwrAuthGuard
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error404Component,
    name: 'Error404Component'
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;
