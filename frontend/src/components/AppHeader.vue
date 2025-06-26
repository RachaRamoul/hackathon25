<template>
  <v-app-bar
    flat
    height="64"
    class="border-b border-black-100 px-8"
    color="app-bar"
  >
    <div class="w-full flex justify-between">

      <RouterLink to="/services-list" class="flex items-center">
        <img src="@/assets/logo2.png" alt="Logo" class="w-1/3 h-auto" />
      </RouterLink>

      <div class="flex items-center gap-6">
        <RouterLink v-if="isConnected" to="/service-provider/services" class="text-sm text-gray-700 hover:text-black">
          Accueil
        </RouterLink>

        <v-btn
          v-if="isConnected"
          variant="plain"
          color="secondary"
          class="text-sm"
          @click="logout"
        >
          Déconnexion
        </v-btn>

        <RouterLink v-else to="/login">
          <v-btn variant="flat" color="primary" class="text-sm font-medium rounded-md px-4">
            Connexion
          </v-btn>
        </RouterLink>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async ()=> {
  await authStore.verifyAuth()
})

const isConnected = computed(() => authStore.isAuthenticated)

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
