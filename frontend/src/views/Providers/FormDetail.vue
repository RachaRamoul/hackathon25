<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6">{{ form?.title }}</h1>
  
      <form class="space-y-4">
        <div
          v-for="field in form?.variables"
          :key="field.id"
          class="mb-4"
        >
          <label class="block font-semibold mb-1">{{ field.label }}</label>
  
          <input
            v-if="field.type === 'TEXT'"
            type="text"
            class="border px-3 py-2 w-full"
            :required="field.required"
            v-model="responses[field.id]"
          />
  
          <input
            v-else-if="field.type === 'BOOLEAN'"
            type="checkbox"
            :required="field.required"
            v-model="responses[field.id]"
          />
  
          <input
            v-else-if="field.type === 'DATE'"
            type="date"
            class="border px-3 py-2 w-full"
            :required="field.required"
            v-model="responses[field.id]"
          />
  
          <input
            v-else-if="field.type === 'NUMBER'"
            type="number"
            class="border px-3 py-2 w-full"
            :required="field.required"
            v-model="responses[field.id]"
          />
  
          <input
            v-else-if="field.type === 'FILE' || field.type === 'PDF'"
            type="file"
            class="border px-3 py-2 w-full"
            :required="field.required"
            @change="handleFileUpload($event, field.id)"
          />
  
          <p v-else class="text-red-600">Type non supporté</p>
        </div>
      </form>
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
  