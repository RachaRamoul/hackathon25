import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/config/axios';
import { ApiCurrentUserSchema, type ApiCurrentUser, type LoginData } from '@/schemas/user.schema';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = ref<ApiCurrentUser | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const errorMessage = ref('');
  const authAlreadyChecked = ref(false);


  const clearState = () => {
    loading.value = false;
    errorMessage.value = '';
    isAuthenticated.value = false;
    user.value = null;
  };

  const login = async (data: LoginData) => {
    clearState();
    loading.value = true;
    try {
      const response = await apiClient.post('/auth/login', data);
      const token = response.data.token;
      localStorage.setItem('token', token);

      const me = await apiClient.get('/auth/me');
      user.value = ApiCurrentUserSchema.parse(me.data);

      isAuthenticated.value = true;
      router.push('/service-provider/services');

    } catch (error) {
        console.error('Erreur lors de la connexion : ', error);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    clearState();
    localStorage.removeItem('token');
    await router.push({name: 'Login'})
  };

  const verifyAuth = async () => {
    loading.value = true;
    if (authAlreadyChecked.value) return;
    authAlreadyChecked.value = true;
    try {
      const response = await apiClient.get('/auth/me');
      user.value = ApiCurrentUserSchema.parse(response.data);
      isAuthenticated.value = true;
    } catch (err: any) {
      isAuthenticated.value = false;
      user.value = null;
      localStorage.removeItem('token');
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
    errorMessage,
    clearState,
    verifyAuth,
    authAlreadyChecked
  };
});
