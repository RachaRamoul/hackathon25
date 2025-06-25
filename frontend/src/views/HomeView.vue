<template>
  <div class="min-h-screen bg-black flex items-center justify-center bg-white px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Connexion</h2>
        <p class="mt-2 text-sm text-gray-500">Accédez à votre espace prestataire</p>
      </div>
      <div class="bg-black">gzgzg</div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Adresse e-mail"
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Mot de passe"
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none"
          >
            Se connecter
          </button>
        </div>
      </form>

      <p class="text-center text-xs text-gray-400">
        © {{ new Date().getFullYear() }} Services. Tous droits réservés.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Appelle ton backend ou simule une connexion
  console.log({ email: email.value, password: password.value })
}
</script>
