import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import publicRoute from './public'
import servicesProviderRoute from './serviceProvider'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  ...publicRoute,
  ...servicesProviderRoute
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    const requiresAuth = to.meta.requiresAuth ?? true;
    console.log('requiresAuth', requiresAuth);
    

    if (requiresAuth && !authStore.isAuthenticated && !authStore.authAlreadyChecked) {
      console.log('grsgggg');
      
      await authStore.verifyAuth();
    }
  
    if (requiresAuth && !authStore.isAuthenticated) {
      return next({ name: 'Login' });
    }
  
    if (to.name === 'Login' && authStore.isAuthenticated) {
      return next({ name: 'ProviderServicesList' });
    }

    next();
});

export default router