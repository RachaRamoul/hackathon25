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
        component: () => import('@/views/serviceProvider/ProviderServiceBuilder.vue'),
        meta: { requiresAuth: false }
      },
    ],
  }
];


export default servicesProviderRoute
