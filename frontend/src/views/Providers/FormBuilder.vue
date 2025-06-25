<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h1 class="form-title">🎨 Créer un service</h1>

      <input
        v-model="store.formTitle"
        placeholder="Titre du formulaire"
        class="form-input"
      />

      <div
        v-for="(field, index) in store.fields"
        :key="index"
        class="form-field-row"
      >
        <input
          v-model="field.label"
          placeholder="Nom du champ"
          class="form-input"
        />

        <select v-model="field.type" class="form-select">
          <option value="TEXT">Texte</option>
          <option value="BOOLEAN">Boolean</option>
          <option value="FILE">Fichier</option>
          <option value="PDF">PDF</option>
          <option value="DATE">Date</option>
          <option value="NUMBER">Nombre</option>
        </select>

        <label class="form-checkbox">
          <input type="checkbox" v-model="field.required" />
          Requis
        </label>

        <button @click="store.removeField(index)" class="btn-remove">
          ❌ Supprimer
        </button>
      </div>

      <div class="form-actions">
        <button @click="store.addField" class="btn-add">
          ➕ Ajouter un champ
        </button>

        <button @click="store.saveForm" class="btn-save">
          💾 Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'

const store = useFormStore()
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

.form-input,
.form-select {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #c084fc;
  width: 100%;
  font-size: 14px;
  margin-bottom: 10px;
}

.form-field-row {
  display: grid;
  grid-template-columns: 2fr 1fr auto auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.btn-remove {
  background: none;
  color: #dc2626;
  border: none;
  font-weight: bold;
  cursor: pointer;
  padding: 6px;
}

.btn-remove:hover {
  color: #b91c1c;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 30px;
}

.btn-add,
.btn-save {
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.btn-add {
  background-color: #8b5cf6;
}

.btn-add:hover {
  background-color: #7c3aed;
}

.btn-save {
  background-color: #10b981;
}

.btn-save:hover {
  background-color: #059669;
}
</style>
