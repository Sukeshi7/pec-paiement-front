<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <form
      @submit.prevent="handleRegister"
      class="bg-white p-8 rounded shadow-md w-full max-w-4xl"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">Inscription Marchand</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">Nom de la société</label>
          <input
            v-model="form.companyName"
            type="text"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">KBIS</label>
          <input
            v-model="form.Kbis"
            type="text"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Nom du contact</label>
          <input
            v-model="form.contactName"
            type="text"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email du contact</label>
          <input
            v-model="form.contactEmail"
            type="email"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Téléphone du contact</label>
          <input
            v-model="form.contactPhone"
            type="tel"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Devise</label>
          <select
            v-model="form.currency"
            required
            class="w-full border border-gray-300 rounded p-2"
          >
            <option value="EUR">Euro</option>
            <option value="USD">Dollar</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">URL de succès</label>
          <input
            v-model="form.redirectSuccessUrl"
            type="url"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">URL d'annulation</label>
          <input
            v-model="form.redirectCancelUrl"
            type="url"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
      </div>
      <div>
          <label class="block text-sm font-medium mb-1">Url de votre boutique</label>
          <input
            v-model="form.shopUrl"
            required
            class="w-full border border-gray-300 rounded p-2"
          />
        </div>
      <button
        type="submit"
        class="mt-6 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
      >
        S'inscrire
      </button>
      <button
         @click="router.push('/login')"
        class="mt-6 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
      >
        J'ai déja un compte
      </button>
    </form>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = ref({
  companyName: '',
  Kbis: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  redirectSuccessUrl: '',
  redirectCancelUrl: '',
  currency: 'EUR',
  shopUrl:'',
})

const errorMessage = ref('')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const handleRegister = async () => {
  try {
   const response =  await axios.post(`${apiUrl}/merchants`, form.value);
    alert("Inscription réussie ! Vérifiez votre email pour activer votre compte.");
  } catch (error) {
    errorMessage.value = "Erreur lors de l'inscription."
  }
}
</script>


