<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const token = localStorage.getItem('admin_token')
const merchants = ref([])
const search = ref('')
const error = ref('')
const message = ref('')

const fetchMerchants = async () => {
  try {
    const res = await axios.get('http://localhost:3000/admin/merchants', {
      headers: { Authorization: `Bearer ${token}` }
    })
    merchants.value = res.data.merchants
  } catch (err) {
    error.value = 'Erreur de chargement des marchands.'
  }
}

const toggleStatus = async (merchant) => {
  try {
    const res = await axios.patch(`http://localhost:3000/admin/merchants/${merchant.id}/toggle`, {}, {
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

const filteredMerchants = computed(() => {
  return merchants.value.filter(m =>
    m.companyName.toLowerCase().includes(search.value.toLowerCase()) ||
    m.contactEmail.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(fetchMerchants)
</script>
<template>
  <div class="bg-white p-6 rounded shadow border">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-700">Marchands</h2>
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher par nom ou email"
        class="border px-3 py-2 rounded w-64 text-sm"
      />
    </div>

    <table class="w-full text-sm text-left border">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Nom</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Statut</th>
          <th class="p-2 border text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="merchant in filteredMerchants" :key="merchant.id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ merchant.id }}</td>
          <td class="p-2 border">{{ merchant.companyName }}</td>
          <td class="p-2 border">{{ merchant.contactEmail }}</td>
          <td class="p-2 border">
            <span :class="merchant.isActive ? 'text-green-600' : 'text-red-500'">
              {{ merchant.isActive ? 'Actif' : 'Inactif' }}
            </span>
          </td>
          <td class="p-2 border text-center">
            <button
              @click="toggleStatus(merchant)"
              class="px-3 py-1 text-xs rounded text-white"
              :class="merchant.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
            >
              {{ merchant.isActive ? 'Désactiver' : 'Activer' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</p>
    <p v-if="message" class="mt-4 text-green-600 text-sm">{{ message }}</p>
  </div>
</template>