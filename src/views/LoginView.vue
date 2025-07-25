<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'
const credentials = ref({
  email: '',
  password: '',
})

const errorMessage = ref('')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
console.log(apiUrl);
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
  <SiteTestNavbarView />
  <div class="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-emerald-100"
    >
      <h1 class="text-2xl font-bold mb-6 text-center text-emerald-700">Connexion Marchand</h1>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          v-model="credentials.email"
          type="email"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1 text-gray-700">Mot de passe</label>
        <input
          v-model="credentials.password"
          type="password"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <div v-if="errorMessage" class="text-red-600 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <button
        type="submit"
        class="w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition"
      >
        Se connecter
      </button>

      <button
        @click="router.push('/register')"
        class="mt-6 w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition"
      >
        Je n'ai pas encore de compte
      </button>
    </form>
  </div>
</template>
