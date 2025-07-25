<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const router = useRouter()

const appId = ref('')
const appSecret = ref('')
const error = ref('')
const success = ref(false)

const validateCredentials = async () => {
    error.value = ''
    success.value = false
    try {
        const res = await axios.post(`${apiUrl}/merchants/validate-credentials`, {
            appId: appId.value,
            appSecret: appSecret.value
        })
        sessionStorage.setItem('test_app_id', appId.value)
        sessionStorage.setItem('test_app_secret', appSecret.value)

        success.value = true

        setTimeout(() => {
            router.push('/product')
        }, 500)

    } catch (err) {
        error.value = err.response?.data?.error || 'Erreur de validation.'
    }
}
</script>

<template>
  <SiteTestNavbarView />
  <div class="min-h-screen flex items-center justify-center bg-emerald-50 font-satoshi">
    <div class="bg-white p-8 rounded-xl shadow-md max-w-md w-full border border-emerald-100">
      <h2 class="text-2xl font-bold mb-6 text-center text-emerald-700">Configuration Marchand</h2>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">APP ID</label>
        <input v-model="appId" type="text"
               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">APP SECRET</label>
        <input v-model="appSecret" type="password"
               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>

      <button @click="validateCredentials"
              class="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
        Valider les Credentials
      </button>

      <p v-if="success" class="text-green-600 text-sm mt-4 text-center">
        Identifiants valides ! Vous allez être redirigé
      </p>
      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

