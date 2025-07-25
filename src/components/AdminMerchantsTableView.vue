<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('admin_token')
const merchants = ref([])
const search = ref('')
const error = ref('')
const message = ref('')

const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL

const fetchMerchants = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/merchants`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    merchants.value = res.data.merchants
  } catch (err) {
    error.value = 'Erreur de chargement des marchands.'
  }
}

const toggleStatus = async (merchant) => {
  try {
    const res = await axios.patch(`${apiUrl}/admin/merchants/${merchant.id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const updatedMerchant = res.data.merchant
    const index = merchants.value.findIndex(m => m.id === updatedMerchant.id)
    if (index !== -1) merchants.value[index] = updatedMerchant

    message.value = res.data.message
    error.value = ''
  } catch (err) {
    error.value = 'Échec lors de la mise à jour du statut.'
    message.value = ''
  }
}

const impersonate = async (merchantId) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/impersonate/${merchantId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })

    localStorage.setItem('merchant_token', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Échec de l’impersonation du marchand.'
  }
}

const filteredMerchants = computed(() => {
  return merchants.value.filter(m =>
    m.companyName.toLowerCase().includes(search.value.toLowerCase()) ||
    m.contactEmail.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(fetchMerchants)
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-md border border-emerald-100 font-satoshi">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-emerald-700">Marchands</h2>
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher par nom ou email"
        class="border border-gray-300 rounded-lg px-3 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    <table class="w-full text-sm text-left border border-emerald-100 rounded-lg overflow-hidden">
      <thead class="bg-emerald-50 text-emerald-800">
      <tr>
        <th class="p-3 border">ID</th>
        <th class="p-3 border">Nom</th>
        <th class="p-3 border">Email</th>
        <th class="p-3 border">Statut</th>
        <th class="p-3 border text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="merchant in filteredMerchants" :key="merchant.id" class="hover:bg-emerald-50">
        <td class="p-2 border">{{ merchant.id }}</td>
        <td class="p-2 border">{{ merchant.companyName }}</td>
        <td class="p-2 border">{{ merchant.contactEmail }}</td>
        <td class="p-2 border">
            <span :class="merchant.isActive ? 'text-emerald-600' : 'text-red-500'">
              {{ merchant.isActive ? 'Actif' : 'Inactif' }}
            </span>
        </td>
        <td class="p-2 border text-center space-x-2">
          <button
            @click="toggleStatus(merchant)"
            class="px-3 py-1 text-xs rounded-lg text-white transition"
            :class="merchant.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'"
          >
            {{ merchant.isActive ? 'Désactiver' : 'Activer' }}
          </button>

          <button
            @click="impersonate(merchant.id)"
            class="px-3 py-1 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Se connecter
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</p>
    <p v-if="message" class="mt-4 text-emerald-600 text-sm">{{ message }}</p>
  </div>
</template>

