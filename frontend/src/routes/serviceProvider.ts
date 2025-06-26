import type { RouteRecordRaw } from 'vue-router'
import ServicesList from '../views/serviceProvider/ProviderServicesList.vue'


const servicesProviderRoute: Array<RouteRecordRaw> = [
  {
    path: '/service-provider',
    children: [
      {
        path: 'services',
        name: 'ProviderServicesList',
        component: ServicesList,
        meta: { requiresAuth: false }
      }, 
      {
        path: 'form-builder',
        name: 'FormBuilder',
        component: () => import('@/views/Providers/FormBuilder.vue'),
        meta: { requiresAuth: false }
      },
    ],
  }
];


export default servicesProviderRoute
