<template>
  <div class="min-h-screen bg-white flex justify-center items-start pt-10 px-4">
    <div class="w-full max-w-3xl">
      <div class="bg-white shadow rounded-xl p-6 border border-gray-200">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Créer un service</h1>
        <div class="mb-4">
          <v-text-field
            v-model="store.formTitle"
            label="Titre"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <v-textarea
            v-model="store.formDescription"
            label="Description"
            variant="outlined"
            rows="2"
            density="compact"
            auto-grow
            hide-details="auto"
          />
        </div>

        <!-- Type & Prix -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <v-select
            v-model="store.formType"
            :items="['ia', 'human']"
            label="Type"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
          <v-text-field
            v-model="store.formPrice"
            label="Prix (€)"
            type="number"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </div>

        <div v-if="store.formType === 'ia'" class="space-y-4 mb-6">
          
          <v-text-field
            v-model="store.formApiKey"
            label="Clé API OpenAI"
            type="password"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />

          <v-select
            v-model="store.formProvider"
            :items="['openai', 'mistral', 'anthropic', 'groq']"
            label="Fournisseur IA"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />

          <v-select
            v-model="store.formModel"
            :items="['gpt-3.5-turbo', 'gpt-4']"
            label="Modèle OpenAI"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />

          <v-textarea
            v-model="store.formSystemPrompt"
            label="Instructions pour l'IA (system prompt)"
            rows="2"
            auto-grow
            variant="outlined"
            density="compact"
            hide-details="auto"
          />

          <v-textarea
            v-model="store.formDefaultPrompt"
            ref="defaultPromptRef"
            label="Prompt par défaut (avec variables)"
            hint="Utilisez des variables comme {client_name}, {job_title}... en cliquant dessus"
            persistent-hint
            rows="2"
            auto-grow
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
          <v-btn
            size="small"
            variant="tonal"
            color="primary"
            @click="extractFieldsFromPrompt"
          >
            Générer les champs depuis le prompt
          </v-btn>
          <div v-if="store.formType === 'ia' && store.fields.length" class="space-y-2">
            <label class="text-sm text-gray-600 font-medium">Variables disponibles :</label>
            <div v-if="availableVariables.length > 0"  class="flex flex-wrap gap-2">
              <v-chip
                v-for="(field, index) in availableVariables"
                :key="index"
                variant="outlined"
                color="primary"
                size="small"
                class="cursor-pointer"
                @click="insertVariable(field.label)"
              >
                {{ "{" + toVariableKey(field.label) + "}" }}
              </v-chip>
            </div>
            
            <div v-else class="text-sm text-gray-500 italic">
              Aucune variable disponible. Ajoutez des champs dynamiques ci-dessous pour les utiliser dans le prompt.
            </div>
            
          </div>
        </div>

        <!-- Champs dynamiques -->
        <div class="space-y-4 mb-6">
          <div
            v-for="(field, index) in store.fields"
            :key="index"
            class="border border-gray-100 rounded-md p-4"
          >
            <div class="grid grid-cols-12 gap-3 items-center">
              <div class="col-span-5">
                <v-text-field
                  v-model="field.label"
                  label="Nom"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </div>
              <div class="col-span-4">
                <v-select
                  v-model="field.type"
                  :items="['TEXT', 'BOOLEAN', 'FILE', 'PDF', 'DATE', 'NUMBER']"
                  label="Type"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </div>
              <div class="col-span-2">
                <v-checkbox
                  v-model="field.required"
                  label="Requis"
                  density="compact"
                  hide-details
                />
              </div>
              <div class="col-span-1 text-right">
                <v-btn icon variant="text" size="small" color="gray" @click="store.removeField(index)">
                  <v-icon size="18">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between mt-4">
          <v-btn variant="plain" size="small" color="secondary" @click="store.addField">
            Ajouter un champ
          </v-btn>
          <v-btn variant="flat" size="small" color="secondary" @click="store.saveService">
            {{ store.formType === 'ia' ? 'Enregistrer le service IA' : 'Enregistrer le service Humain' }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useServiceStore } from '../../stores/service'
import {
  VBtn,
  VCard,
  VCheckbox,
  VCol,
  VContainer,
  VIcon,
  VRow,
  VSelect,
  VTextField,
  VTextarea,
} from 'vuetify/components'

const authStore = useAuthStore()
const store = useServiceStore()
const defaultPromptRef = ref<any>(null);

watchEffect(() => {
  if (authStore.user?.id) {
    store.serviceProviderId = authStore.user.id
  }
})

const availableVariables = computed(() =>
  store.fields.filter(f => f.label && f.label.trim().length > 0)
)

function toVariableKey(label: string): string {
  return label
    .normalize("NFD")             
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")        
    .replace(/[^a-z0-9_]/g, "");     
}

function insertVariable(label: string) {
  const variable = `{${toVariableKey(label)}}`;

  nextTick(() => {
    const textarea = defaultPromptRef.value?.$el?.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = store.formDefaultPrompt;

    store.formDefaultPrompt = text.slice(0, start) + variable + text.slice(end);

    nextTick(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variable.length, start + variable.length);
    });
  });
}

function extractFieldsFromPrompt() {
  const regex = /{([\w\d_]+)}/g;
  const foundVariables = new Set<string>();
  let match;

  while ((match = regex.exec(store.formDefaultPrompt)) !== null) {
    const variable = match[1];
    const alreadyExists = store.fields.some(f => toVariableKey(f.label) === variable);
    if (!alreadyExists) {
      store.fields.push({
        label: variable.replace(/_/g, ' '),
        type: 'TEXT',
        required: true,
      });
      foundVariables.add(variable);
    }
  }

  if (foundVariables.size === 0) {
    alert("Aucune nouvelle variable trouvée ou elles existent déjà.");
  } else {
    alert(`${foundVariables.size} variable(s) ajoutée(s) depuis le prompt.`);
  }
}

</script>

