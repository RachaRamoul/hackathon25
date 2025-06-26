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
          <label class="block font-medium text-gray-700">{{ field.label }}</label>

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

const handleFileUpload = (event: Event, fieldId: string) => {
  const target = event.target as HTMLInputElement
  if (target.files?.[0]) {
    responses.value[fieldId] = target.files[0]
  }
}
</script>
