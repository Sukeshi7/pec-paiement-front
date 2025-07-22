<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const credentials = ref({
  appId: '',
  appSecret: '',
})

const errorMessage = ref('')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const handleLogin = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, credentials.value)
    const { access_token } = response.data
    localStorage.setItem('token', access_token)
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
    errorMessage.value = error.response?.data?.error || 'Erreur de connexion'
  }
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-8 rounded shadow-md w-full max-w-md"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">Connexion Marchand</h1>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">App ID</label>
        <input
          v-model="credentials.appId"
          type="text"
          required
          class="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">App Secret</label>
        <input
          v-model="credentials.appSecret"
          type="text"
          required
          class="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div v-if="errorMessage" class="text-red-600 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <button
        type="submit"
        class="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
      >
        Se connecter
      </button>
       <button
         @click="router.push('/register')"
        class="mt-6 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
      >
        Je n'ai pas encore de compte
      </button>
    </form>
  </div>
</template>



