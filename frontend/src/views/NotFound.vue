<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-lg text-gray-600 mb-6">Oups, cette page n'existe pas.</p>
    <RouterLink to="/">
      <v-btn color="primary" class="text-white">Retour à l'accueil</v-btn>
    </RouterLink>
  </div>
</template>