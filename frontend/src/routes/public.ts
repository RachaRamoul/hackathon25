import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import ServicesList from '../views/ServicesList.vue'
import NotFound from '../views/NotFound.vue'
import FormList from '@/views/Providers/FormList.vue'
import FormDetail from '@/views/Providers/FormDetail.vue'

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
        path: 'form',
        component: FormList,
        meta: { requiresAuth: false }
      },
      {
        path: '/forms/:id',
        component: FormDetail,
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
