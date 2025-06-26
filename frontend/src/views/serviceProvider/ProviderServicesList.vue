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
                  <v-tooltip text="Modifier le service">
                    <template #activator="{ props }">
                      <v-icon 
                        v-bind="props"         
                        icon="mdi-pencil"
                        color="primary"
                        size="24"
                        class="cursor-pointer" 
                        @click="editService(service.id)"/>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const services = ref([
  {
    id: 1,
    name: 'Génération de pitch',
    provider: { firstName: 'Racha', lastName: 'Ramoul' },
    description: 'Ce service permet de générer un pitch automatique à partir de vos idées.',
    createdAt: '2025-06-25T14:10:00',
    type: 'ia',
  },
  {
    id: 2,
    name: 'Création de site vitrine',
    provider: { firstName: 'Hema', lastName: 'Birabourame' },
    description: 'Un prestataire humain vous accompagne dans la création d’un site vitrine moderne.',
    createdAt: '2025-06-20T10:00:00',
    type: 'human',
  },
  {
    id: 3,
    name: 'Correction orthographique IA',
    provider: { firstName: 'Sarah', lastName: 'Salamani' },
    description: 'Corrige automatiquement vos textes grâce à une IA spécialisée.',
    createdAt: '2025-06-10T09:00:00',
    type: 'ia',
  },
])

const editService = (id: number) => {
  console.log('Modifier le service :', id)
  // Ici tu peux faire une navigation ou ouvrir une modale d'édition
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

const goToCreateService = () => {
  console.log('coucou create service');
  
  //router.push('/service-provider/services/create') 
}
</script>
