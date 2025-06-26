import { defineStore } from 'pinia'
import axios from 'axios'

export const useFormStore = defineStore('form', {
  state: () => ({
    formTitle: '',
    formDescription: '', 
    formType: '',         
    fields: [{ label: '', type: 'TEXT', required: false }],
    forms: [],
    currentForm: null,
  }),

  actions: {
    addField() {
      this.fields.push({ label: '', type: 'TEXT', required: false })
    },

    removeField(index: number) {
      this.fields.splice(index, 1)
    },

    async saveForm() {
      if (!this.formTitle || !this.formDescription || !this.formType) {
        alert('Veuillez remplir tous les champs obligatoires.')
        return
      }
    
      if (this.fields.length === 0) {
        alert('Ajoutez au moins un champ.')
        return
      }
    
      const invalidField = this.fields.find(f => !f.label || !f.type)
      if (invalidField) {
        alert('Tous les champs doivent avoir un nom et un type.')
        return
      }
    
      try {
        await axios.post('http://localhost:8000/forms', {
          title: this.formTitle,
          description: this.formDescription,
          type: this.formType,
          variables: this.fields,
        })
        alert('✅ Formulaire enregistré !')
      } catch (error) {
        console.error(error)
        alert('Erreur lors de la sauvegarde')
      }
    },    

    async fetchForms() {
      try {
        const { data } = await axios.get('http://localhost:8000/forms')
        this.forms = data
      } catch (error) {
        console.error('Erreur fetchForms', error)
      }
    },

    async fetchForm(id: string) {
      try {
        const { data } = await axios.get(`http://localhost:8000/forms/${id}`)
        this.currentForm = data
      } catch (error) {
        console.error('Erreur fetchForm', error)
      }
    },
  },
})
