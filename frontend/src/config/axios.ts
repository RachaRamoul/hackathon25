import axios from 'axios';
import { API_BASE_URL } from './api';
import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false
})

apiClient.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {  
      const { config, response } = error;
      const status = response?.status;
      const authStore = useAuthStore()
      const token = localStorage.getItem('token')

      const isSilentAuthCheck = config?.meta?.isSilentAuthCheck === true;

      if (status === 401 && !isSilentAuthCheck && (!token || !authStore.isAuthenticated)) {
        await authStore.logout();
      }
      return Promise.reject(error);
    }
);

export default apiClient;
