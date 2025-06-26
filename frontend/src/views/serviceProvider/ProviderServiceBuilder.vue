<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="rounded-xl shadow-md px-6 py-8">
            <h1 class="text-2xl font-bold mb-6 text-purple-800 text-center"> Créer un service </h1>

            <v-text-field
              v-model="store.formTitle"
              label="Titre du formulaire"
              outlined
              dense
              class="mb-4"
              :rules="[v => !!v || 'Le titre est requis']"
              required
            />

            <v-textarea
              v-model="store.formDescription"
              label="Description du formulaire"
              rows="3"
              outlined
              class="mb-4"
              :rules="[v => !!v || 'La description est requise']"
              required
            />

            <v-select
              v-model="store.formType"
              :items="['ia', 'human']"
              label="Type de service"
              outlined
              dense
              class="mb-6"
              :rules="[v => !!v || 'Le type est requis']"
              required
            />

            <v-text-field
                  v-model="store.formPrice"
                  label="Prix (€)"
                  outlined
                  dense
                  class="mb-6"
                  type="number"
                  :rules="[v => v >= 0 || 'Le prix doit être positif']"
                  required
            />
            
            <div v-for="(field, index) in store.fields" :key="index" class="mb-4">
              <v-row dense align="center">
                <v-col cols="5">
                  <v-text-field
                    v-model="field.label"
                    label="Nom du champ"
                    outlined
                    dense
                    :rules="[v => !!v || 'Champ requis']"
                    required
                  />
                </v-col>

                <v-col cols="3">
                  <v-select
                  v-model="field.type"
                  :items="['TEXT', 'BOOLEAN', 'FILE', 'PDF', 'DATE', 'NUMBER']"
                  label="Type"
                  outlined
                  dense
                  :rules="[v => !!v || 'Type requis']"
                  required
                  />
                </v-col>

                <v-col cols="2">
                  <v-checkbox
                    v-model="field.required"
                    label="Requis"
                    hide-details
                  />
                </v-col>

                <v-col cols="2" class="text-right">
                  <v-btn icon color="red" @click="store.removeField(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-row justify="space-between" class="mt-6">
              <v-btn color="primary" variant="flat" @click="store.addField">
                ➕ Ajouter un champ
              </v-btn>

              <v-btn color="success" variant="flat" @click="store.saveService">
                💾 Enregistrer
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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

