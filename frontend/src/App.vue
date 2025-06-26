<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
    <v-app class="flex p-20">
      <AppHeader />
      <RouterView />
    </v-app>
</template>
