<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6">📄 Liste des formulaires</h1>
  
      <ul class="space-y-3">
        <li
          v-for="form in forms"
          :key="form.id"
          @click="goToForm(form.id)"
          class="cursor-pointer p-4 border rounded hover:bg-purple-100"
        >
          {{ form.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  type Form = {
    id: string
    title: string
  }
  
  const forms = ref<Form[]>([])
  const router = useRouter()
  
  onMounted(async () => {
    const { data } = await axios.get('http://localhost:8000/forms')
    forms.value = data
  })
  
  const goToForm = (id: string) => {
    router.push(`/forms/${id}`)
  }
  </script>
  
  