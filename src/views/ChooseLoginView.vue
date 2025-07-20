<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md space-y-4 w-80 text-center">
      <h1 class="text-xl font-semibold text-gray-700">Connexion</h1>

      <button
        @click="router.push('/admin/login')"
        class="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
      >
       Vous êtes Administrateur ?
      </button>

      <button
        @click="router.push('/register')"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Vous êtes Marchand ?
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
