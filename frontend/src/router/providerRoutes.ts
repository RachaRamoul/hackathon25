import FormList from '@/views/Providers/FormList.vue'
import FormDetail from '@/views/Providers/FormDetail.vue'

export default [
    {
      path: '/form-builder',
      name: 'FormBuilder',
      component: () => import('@/views/Providers/FormBuilder.vue')
    },
    {
      path: '/formulaires',
      component: FormList,
    },
    {
      path: '/forms/:id',
      component: FormDetail,
    },
]
