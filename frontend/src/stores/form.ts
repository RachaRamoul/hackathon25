import { defineStore } from 'pinia'
import axios from 'axios'

export const useFormStore = defineStore('form', {
  state: () => ({
    formTitle: '',
    fields: [{ label: '', type: 'TEXT', required: false }],
  }),
  actions: {
    addField() {
      this.fields.push({ label: '', type: 'TEXT', required: false })
    },
    removeField(index: number) {
      this.fields.splice(index, 1)
    },
    async saveForm() {
      try {
        await axios.post('http://localhost:8000/forms', {
          title: this.formTitle,
          variables: this.fields, 
        })
        alert('Formulaire enregistré !')
      } catch (error) {
        console.error(error)
        alert('Erreur lors de la sauvegarde')
      }
    },
  },
})
