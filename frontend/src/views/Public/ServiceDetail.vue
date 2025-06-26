<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">{{ service?.name }}</h1>

      <form class="space-y-6">
        <div
          v-for="field in service?.variables"
          :key="field.id"
          class="space-y-2"
        >
        <label class="block font-medium text-gray-700">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>

          <input
            v-if="field.type === 'TEXT'"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            :required="field.required"
            v-model="responses[field.id]"
          />

          <input
            v-else-if="field.type === 'NUMBER'"
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            :required="field.required"
            v-model="responses[field.id]"
          />

          <input
            v-else-if="field.type === 'BOOLEAN'"
            type="checkbox"
            class="w-5 h-5"
            :required="field.required"
            v-model="responses[field.id]"
          />

          <input
            v-else-if="field.type === 'DATE'"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            :required="field.required"
            v-model="responses[field.id]"
          />

          <input
            v-else-if="field.type === 'FILE' || field.type === 'PDF'"
            type="file"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            :required="field.required"
            @change="handleFileUpload($event, field.id)"
          />

          <p v-else class="text-red-600"> Type non supporté : {{ field.type }}</p>
        </div>
      </form>
      <div class="mt-6">
        <button
          @click="sendToIa"
          class="bg-secondary px-4 py-2 rounded text-white"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Envoyer à l'IA</span>
          <span v-else>Traitement en cours...</span>
        </button>
      </div>
      <div v-if="isLoading" class="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg class="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        L'IA est en train de générer la réponse...
      </div>

      <div v-if="!isLoading && iaResponse" class="mt-6 p-4 border border-green-400 bg-green-50 rounded">
        <h2 class="text-lg font-semibold text-green-700 mb-2">Réponse de l'IA :</h2>
        <p class="text-gray-800 whitespace-pre-line">{{ iaResponse }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/config/axios'

const route = useRoute()
const service = ref<any>(null)
const responses = ref<{ [key: string]: any }>({})
const isLoading = ref(false)

onMounted(async () => {
  try {
    const { data } = await apiClient.get(`/services/${route.params.id}`)
    service.value = data

    data.variables.forEach((field: any) => {
      responses.value[field.id] =
        field.type === 'BOOLEAN'
          ? false
          : field.type === 'FILE' || field.type === 'PDF'
          ? null
          : ''
    })
  } catch (error) {
    console.error('Erreur lors du chargement du service :', error)
  }
})

const iaResponse = ref<string | null>(null)

const sendToIa = async () => {
  if (!service.value?.id) return;

  const missing = service.value.variables.find(field => {
    if (!field.required) return false;

    const value = responses.value[field.id];

    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (field.type === 'FILE' && !value)
    );
  });

  isLoading.value = true;

  if (missing) {
    alert(`Le champ "${missing.label}" est requis.`);
    return;
  }

  try {
    const { data } = await apiClient.post('/ia/execute', {
      serviceId: service.value.id,
      variables: responses.value,
    });

    iaResponse.value = data.response;
  } catch (err) {
    console.error('Erreur IA :', err);
    iaResponse.value = "Une erreur s'est produite lors de l'appel à l'IA.";
  } finally {
    isLoading.value = false;
  }
};


const handleFileUpload = (event: Event, fieldId: string) => {
  const target = event.target as HTMLInputElement
  if (target.files?.[0]) {
    responses.value[fieldId] = target.files[0]
  }
}
</script>
