<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Mes services</h1>
      <v-btn color="primary" class="text-white text-sm font-medium" @click="goToCreateService">
        Nouveau service
      </v-btn>
    </div>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="service in services"
          :key="service.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="rounded-xl shadow-md hover:shadow-lg transition-all h-full">
            <v-card-title class="text-lg font-semibold text-secondary">
              <div class="flex justify-between items-center w-full">
                <span>{{ service.name }}</span>
                <span class="text-sm text-gray-600">{{ service.price }} €</span>
                <v-tooltip text="Modifier le service">
                  <template #activator="{ props }">
                    <v-icon 
                      v-bind="props"         
                      icon="mdi-pencil"
                      color="primary"
                      size="24"
                      class="cursor-pointer" 
                      @click="editService(service.id)" />
                  </template>
                </v-tooltip>
              </div>
            </v-card-title>

            <v-card-text class="text-sm text-gray-700">
              <p class="mb-2">{{ service.description }}</p>
              <p class="text-xs text-gray-400">Créé le {{ formatDate(service.createdAt) }}</p>
            </v-card-text>

            <v-card-actions class="px-4 pb-4">
              <v-chip
                :color="service.type === 'ia' ? 'blue' : 'green'"
                variant="flat"
                class="text-white text-xs"
              >
                {{ service.type === 'ia' ? 'Service IA' : 'Service Humain' }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
  router.push('/service-provider/services/create')
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
