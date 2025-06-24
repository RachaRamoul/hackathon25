<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10 border border-purple-200">
      <h1 class="text-3xl font-extrabold mb-10 text-purple-700 text-center flex items-center justify-center gap-2">
        🎨 <span>Créer un formulaire dynamique</span>
      </h1>

      <input
        v-model="formTitle"
        placeholder="Titre du formulaire"
        class="border border-purple-300 rounded px-4 py-3 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <div
        v-for="(field, index) in fields"
        :key="index"
        class="flex flex-col md:flex-row gap-4 mb-4"
      >
        <input
          v-model="field.label"
          placeholder="Nom du champ"
          class="border border-purple-300 rounded px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <select
          v-model="field.type"
          class="border border-purple-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="TEXT">Texte</option>
          <option value="BOOLEAN">Boolean</option>
          <option value="FILE">Fichier</option>
          <option value="PDF">PDF</option>
          <option value="DATE">Date</option>
          <option value="NUMBER">Nombre</option>
        </select>

        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="field.required" />
          <span class="text-gray-700">Requis</span>
        </label>

        <button
          @click="removeField(index)"
          class="text-red-600 hover:text-red-800 font-medium"
        >
          ❌ Supprimer
        </button>
      </div>

      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
        <button
          @click="addField"
          class="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded shadow"
        >
          ➕ Ajouter un champ
        </button>

        <button
          @click="saveForm"
          class="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded shadow"
        >
          💾 Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const formTitle = ref('')
const fields = ref([{ label: '', type: 'TEXT', required: false }])

const addField = () => {
  fields.value.push({ label: '', type: 'TEXT', required: false })
}

const removeField = (index: number) => {
  fields.value.splice(index, 1)
}

const saveForm = async () => {
  try {
    await axios.post('/api/forms', {
      title: formTitle.value,
      fields: fields.value
    })
    alert('Formulaire enregistré !')
  } catch (e) {
    console.error(e)
    alert('Erreur lors de la sauvegarde')
  }
}
</script>
