import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import ServicesList from '../views/Public/ServicesList.vue'
import NotFound from '../views/NotFound.vue'
import FormDetail from '@/views/Public/ServiceDetail.vue'

const publicRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
      },
      {
        path: 'services-list',
        name: 'Services',
        component: ServicesList,
        meta: { requiresAuth: false }
      },
      {
        path: '/services/:id',
        component: FormDetail,
        meta: { requiresAuth: false }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { requiresAuth: false },
      },
    ],
  }
];

export default publicRoute
