<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10 border border-purple-200">
        <h1 class="text-3xl font-extrabold mb-10 text-purple-700 text-center">
          {{ form?.title }}
        </h1>
  
        <form class="space-y-6">
          <div
            v-for="field in form?.variables"
            :key="field.id"
            class="flex flex-col gap-2"
          >
            <label class="font-semibold text-gray-700">{{ field.label }}</label>
  
            <input
              v-if="field.type === 'TEXT'"
              type="text"
              class="border border-purple-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'BOOLEAN'"
              type="checkbox"
              class="h-5 w-5 text-purple-600 focus:ring-purple-400"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'DATE'"
              type="date"
              class="border border-purple-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'NUMBER'"
              type="number"
              class="border border-purple-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'FILE' || field.type === 'PDF'"
              type="file"
              class="border border-purple-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
              :required="field.required"
              @change="handleFileUpload($event, field.id)"
            />
  
            <p v-else class="text-red-600">Type non supporté</p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const form = ref<any>(null)
  const responses = ref<{ [key: string]: any }>({})
  
  onMounted(async () => {
    const { data } = await axios.get(`http://localhost:8000/forms/${route.params.id}`)
    form.value = data
  
    data.variables.forEach((field: any) => {
      responses.value[field.id] =
        field.type === 'BOOLEAN' ? false : field.type === 'FILE' || field.type === 'PDF' ? null : ''
    })
  })
  
  const handleFileUpload = (event: Event, fieldId: string) => {
    const target = event.target as HTMLInputElement
    if (target.files?.[0]) {
      responses.value[fieldId] = target.files[0]
    }
  }
  </script>
  