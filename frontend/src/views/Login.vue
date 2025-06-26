<template>
  <div v-bind="$attrs" class="min-h-screen flex justify-center items-center">
    <div class="w-full max-w-screen-sm">
      <Login
        :modelValue="form"
        :loading="loading"
        :onSubmit="() => handleLogin(form)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import Login from '@/components/Login.vue'
  import { useAuthStore } from '@/stores/auth'
  import type { LoginData } from '@/schemas/user.schema'

  const authStore = useAuthStore();

  const form = reactive({ email: '', password: '' });
  const loading = computed(() => authStore.loading);

  const handleLogin = async (form: LoginData) => {
    await authStore.login(form);
  };
</script>
