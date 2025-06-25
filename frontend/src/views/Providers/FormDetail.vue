<template>
    <div class="form-wrapper">
      <div class="form-container">
        <h1 class="form-title">{{ form?.title }}</h1>
  
        <form class="space-y-6">
          <div
            v-for="field in form?.variables"
            :key="field.id"
            class="form-field-row"
          >
            <label class="font-semibold text-gray-700">{{ field.label }}</label>
  
            <input
              v-if="field.type === 'TEXT'"
              type="text"
              class="form-input"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'BOOLEAN'"
              type="checkbox"
              class="checkbox-input"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'DATE'"
              type="date"
              class="form-input"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'NUMBER'"
              type="number"
              class="form-input"
              :required="field.required"
              v-model="responses[field.id]"
            />
  
            <input
              v-else-if="field.type === 'FILE' || field.type === 'PDF'"
              type="file"
              class="form-input"
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
        field.type === 'BOOLEAN'
          ? false
          : field.type === 'FILE' || field.type === 'PDF'
          ? null
          : ''
    })
  })
  
  const handleFileUpload = (event: Event, fieldId: string) => {
    const target = event.target as HTMLInputElement
    if (target.files?.[0]) {
      responses.value[fieldId] = target.files[0]
    }
  }
  </script>
  
  <style scoped>
  .form-wrapper {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #f3e8ff, #ffffff);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }
  
  .form-container {
    max-width: 800px;
    width: 100%;
    background-color: white;
    border: 1px solid #c084fc;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(128, 90, 213, 0.2);
  }
  
  .form-title {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #7e22ce;
    margin-bottom: 30px;
  }
  
  .form-input {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #c084fc;
    width: 100%;
    font-size: 14px;
  }
  
  .checkbox-input {
    width: 20px;
    height: 20px;
  }
  
  .form-field-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  </style>
  