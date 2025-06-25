<template>
    <div class="form-wrapper">
      <div class="form-container">
        <h1 class="form-title">📄 Liste des formulaires</h1>
  
        <ul class="form-list">
          <li
            v-for="form in forms"
            :key="form.id"
            @click="goToForm(form.id)"
            class="form-list-item"
          >
            {{ form.title }}
          </li>
        </ul>
      </div>
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
  
  .form-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .form-list-item {
    padding: 16px;
    border: 1px solid #c084fc;
    border-radius: 10px;
    background-color: #faf5ff;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .form-list-item:hover {
    background-color: #ede9fe;
  }
  </style>
  