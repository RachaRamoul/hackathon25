import { defineStore } from 'pinia'
import apiClient from '@/config/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useServiceStore = defineStore('service', {
  state: () => ({
    formTitle: '',
    formDescription: '', 
    formType: 'ia', 
    formPrice: 0, 
    serviceProviderId: '', 
    formModel: 'gpt-4',
    formSystemPrompt: '',
    formDefaultPrompt: '',
    formApiKey: '',       
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

    async saveService() {
      console.log({
        title: this.formTitle,
        description: this.formDescription,
        type: this.formType,
        serviceProviderId: this.serviceProviderId,
        price: this.formPrice
      })
      
      if (!this.formTitle || !this.formDescription || !this.formType || !this.serviceProviderId) {
        alert('Veuillez remplir tous les champs obligatoires.')
        return
      }

      if (this.formType && (!this.formModel || !this.formSystemPrompt || !this.formDefaultPrompt || !this.formApiKey)) {
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
        await apiClient.post('/services', {
          name: this.formTitle,
          description: this.formDescription,
          type: this.formType,
          serviceProviderId: this.serviceProviderId,
          model: this.formModel,
          systemPrompt: this.formSystemPrompt,
          price: Number(this.formPrice),
          defaultPrompt: this.formDefaultPrompt,
          apiKey: this.formApiKey,
          variables: this.fields,
        })
        alert(' Service enregistré !')
        router.push('/service-provider/services')
      } catch (error) {
        console.error(error)
        alert('Erreur lors de la sauvegarde')
      }
    },    

    async fetchServices() {
      try {
        const { data } = await apiClient.get('/services')
        this.forms = data
      } catch (error) {
        console.error('Erreur fetchServices', error)
      }
    },    

    async fetchService(id: string) {
      try {
        const { data } = await apiClient.get(`/services/${id}`) 
        this.currentForm = data
      } catch (error) {
        console.error('Erreur fetchService', error)
      }
    }
    
  },
})
