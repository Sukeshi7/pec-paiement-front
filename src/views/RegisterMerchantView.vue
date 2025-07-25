
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'
const form = ref({
  companyName: '',
  Kbis: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  password: '',
})

const errorMessage = ref('')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const handleRegister = async () => {
  try {
    const response = await axios.post(`${apiUrl}/merchants`, form.value);
    alert("Inscription réussie ! Vérifiez votre email pour activer votre compte.");
  } catch (error) {
    errorMessage.value = "Erreur lors de l'inscription."
  }
}
</script>

<template>
  <SiteTestNavbarView />
  <div class="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
    <form
      @submit.prevent="handleRegister"
      class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-emerald-100"
    >
      <h1 class="text-2xl font-bold mb-6 text-center text-emerald-700">Inscription Marchand</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Nom de la société</label>
          <input v-model="form.companyName" type="text" required
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">KBIS</label>
          <input v-model="form.Kbis" type="text" required
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Nom du contact</label>
          <input v-model="form.contactName" type="text" required
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Email du contact</label>
          <input v-model="form.contactEmail" type="email" required
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Téléphone du contact</label>
          <input v-model="form.contactPhone" type="tel" required
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Mot de passe</label>
          <input v-model="form.password" required type="password"
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
      </div>

      <button type="submit"
              class="mt-6 w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition">
        S'inscrire
      </button>
      <button @click="router.push('/login')"
              class="mt-4 w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition">
        J'ai déjà un compte
      </button>
    </form>
  </div>
</template>


