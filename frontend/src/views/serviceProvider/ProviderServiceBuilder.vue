<template>
  <div class="min-h-screen bg-white flex justify-center items-start pt-10 px-4">
    <div class="w-full max-w-3xl">
      <div class="bg-white shadow rounded-xl p-6 border border-gray-200">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Créer un service</h1>
        <div class="mb-4">
          <v-text-field
            v-model="store.formTitle"
            label="Titre"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <v-textarea
            v-model="store.formDescription"
            label="Description"
            variant="outlined"
            rows="2"
            density="compact"
            auto-grow
            hide-details="auto"
          />
        </div>

        <!-- Type & Prix -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <v-select
            v-model="store.formType"
            :items="['ia', 'human']"
            label="Type"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
          <v-text-field
            v-model="store.formPrice"
            label="Prix (€)"
            type="number"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </div>

        <!-- Champs dynamiques -->
        <div class="space-y-4 mb-6">
          <div
            v-for="(field, index) in store.fields"
            :key="index"
            class="border border-gray-100 rounded-md p-4"
          >
            <div class="grid grid-cols-12 gap-3 items-center">
              <div class="col-span-5">
                <v-text-field
                  v-model="field.label"
                  label="Nom"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </div>
              <div class="col-span-4">
                <v-select
                  v-model="field.type"
                  :items="['TEXT', 'BOOLEAN', 'FILE', 'PDF', 'DATE', 'NUMBER']"
                  label="Type"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </div>
              <div class="col-span-2">
                <v-checkbox
                  v-model="field.required"
                  label="Requis"
                  density="compact"
                  hide-details
                />
              </div>
              <div class="col-span-1 text-right">
                <v-btn icon variant="text" size="small" color="gray" @click="store.removeField(index)">
                  <v-icon size="18">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between mt-4">
          <v-btn variant="text" size="small" color="primary" @click="store.addField">
            Ajouter un champ
          </v-btn>
          <v-btn variant="flat" size="small" color="success" @click="store.saveService">
            Enregistrer
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { watchEffect } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useServiceStore } from '../../stores/service'
import {
  VBtn,
  VCard,
  VCheckbox,
  VCol,
  VContainer,
  VIcon,
  VRow,
  VSelect,
  VTextField,
  VTextarea,
} from 'vuetify/components'

const authStore = useAuthStore()
const store = useServiceStore()

watchEffect(() => {
  if (authStore.user?.id) {
    store.serviceProviderId = authStore.user.id
  }
})
</script>

