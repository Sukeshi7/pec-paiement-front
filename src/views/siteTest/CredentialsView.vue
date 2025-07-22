<template>
       <SiteTestNavbarView />
    <div class="max-w-4xl mx-auto mt-8">
     
        <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 class="text-xl font-bold mb-4 text-gray-800">Configuration des Credentials</h2>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">App ID</label>
                <input v-model="appId" class="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">App Secret</label>
                <input v-model="appSecret" type="password"
                    class="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <button @click="saveCredentials" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'

const appId = ref(localStorage.getItem('appId') || '')
const appSecret = ref(localStorage.getItem('appSecret') || '')
const message = ref('')
const error = ref('')
const apiUrl = import.meta.env.VITE_API_URL
const saveCredentials = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      appId: appId.value,
      appSecret: appSecret.value
    })

    console.log(response.data.access_token);
    
    const token = response.data.access_token

    localStorage.setItem('appId', appId.value)
    localStorage.setItem('appSecret', appSecret.value)
    localStorage.setItem('merchantToken', token)

    message.value = 'Credentials sauvegardés et login réussi !'
    error.value = ''
  } catch (err) {
    console.error(err)
    error.value = 'Échec de l’authentification. Vérifie l’App ID et App Secret.'
    message.value = ''
  }
}
</script>

