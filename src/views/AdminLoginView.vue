<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'

const email = ref('')
const password = ref('')
const error = ref('')
const apiUrl = import.meta.env.VITE_API_URL
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await fetch(`${apiUrl}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'Erreur lors de la connexion.'
      return
    }

    localStorage.setItem('admin_token', data.token)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = 'Erreur serveur.'
  }
}

onMounted(() => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    router.push('/admin/dashboard')
  }
})
</script>

<template>
  <SiteTestNavbarView />
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-satoshi">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-3xl font-bold mb-6 text-center text-emerald-700">Connexion Admin</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-600 transition font-semibold"
        >
          Se connecter
        </button>

        <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

