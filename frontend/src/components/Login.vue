<template>
    <v-responsive>
            <v-container class="pa-0">
                <v-card           
                    class="mx-auto"
                    :subtitle="subtitle"
                    max-width="600"
                    elevation="0">
                  <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-900 mt-10">Connexion</h2>
                    <p class="mt-2 text-sm text-gray-500">Accédez à votre espace prestataire</p>
                  </div>
            
                  <form @submit.prevent="handleLogin" class="mt-8 m-10 space-y-6">
                    <div class="-space-y-px">
                      <v-text-field
                        v-model="email"
                        label="Adresse e-mail"
                        type="email"
                        required
                        density="comfortable"
                        variant="outlined"
                        class="mb-4"
                      />
                      <v-text-field
                        v-model="password"
                        label="Mot de passe"
                        type="password"
                        required
                        density="comfortable"
                        variant="outlined"
                      />
                    </div>

                    <v-card-actions>
                        <v-btn :loading="loading" color="secondary" block variant="flat" @click="submit">Se connecter</v-btn>
                    </v-card-actions>
            
                  </form>
                </v-card>
            </v-container>
    </v-responsive>
</template>

<script setup lang="ts">
    import { computed, defineProps } from 'vue'
    import type { LoginData } from '@/schemas/user.schema'

    const props = defineProps<{
    modelValue: LoginData
    loading: boolean
    onSubmit: () => void
    }>()

    const email = computed({
    get: () => props.modelValue.email,
    set: (val) => props.modelValue.email = val
    })

    const password = computed({
    get: () => props.modelValue.password,
    set: (val) => props.modelValue.password = val
    })

    const submit = () => props.onSubmit()
</script>
