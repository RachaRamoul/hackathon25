<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-semibold text-gray-800 tracking-tight">
        Mes services
      </h1>

      <v-btn
        color="secondary"
        class="mb-6 text-white text-sm font-medium shadow-sm"
        @click="goToCreateService"
        variant="flat"
      >
        Nouveau service
      </v-btn>
    </div>





    <!-- Cards Grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <v-card
        v-for="service in services"
        :key="service.id"
        class="rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between"
      >
        <!-- Title -->
        <div class="flex items-center justify-between px-5 pt-5">
          <h2 class="text-base font-semibold text-gray-800 truncate">
            {{ service.name }}
          </h2>
          <v-tooltip text="Modifier le service">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                icon="mdi-pencil"
                color="secondary"
                size="20"
                class="cursor-pointer"
                @click="editService(service.id)"
              />
            </template>
          </v-tooltip>
        </div>

        <!-- Content -->
        <v-card-text class="px-5 pb-2 pt-3 text-sm text-gray-600 flex-1">
          <p class="line-clamp-3">{{ service.description }}</p>
          <p class="text-xs text-gray-400 mt-3">Créé le {{ formatDate(service.createdAt) }}</p>
        </v-card-text>

        <!-- Footer -->
        <div class="px-5 pb-4 pt-2">
          <v-chip
            :color="service.type === 'ia' ? 'indigo' : 'green'"
            variant="flat"
            class="text-white text-xs font-medium"
          >
            {{ service.type === 'ia' ? 'Service IA' : 'Service Humain' }}
          </v-chip>
        </div>
      </v-card>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/config/axios' 

const router = useRouter()
const services = ref([])

const editService = (id: number) => {
  router.push(`/service-provider/services/${id}/edit`)
}

const goToCreateService = () => {
  router.push('/service-provider/form-builder')
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

onMounted(async () => {
  try {
    const { data } = await apiClient.get('/serviceProviders/me/services') 
    services.value = data
  } catch (error) {
    console.error('Erreur lors du chargement des services du provider :', error)
  }
})
</script>
