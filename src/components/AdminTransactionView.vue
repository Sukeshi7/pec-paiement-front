<template>
  <div class="bg-white p-6 rounded-xl shadow-md border border-emerald-100 mt-10 font-satoshi">
    <h2 class="text-xl font-semibold mb-6 text-emerald-700">Transactions</h2>
    <div class="flex flex-wrap gap-4 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher ID Transaction"
        class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <select
        v-model="status"
        class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">Tous les statuts</option>
        <option value="success">Succès</option>
        <option value="failed">Échec</option>
        <option value="pending">En attente</option>
      </select>
      <input
        v-model="merchantId"
        type="text"
        placeholder="ID Marchand"
        class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        @click="fetchTransactions"
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
      >
        Rechercher
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-emerald-100 rounded-lg overflow-hidden">
        <thead class="bg-emerald-50 text-emerald-800 text-sm">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Marchand</th>
          <th class="px-4 py-3">Montant (€)</th>
          <th class="px-4 py-3">Statut</th>
          <th class="px-4 py-3">Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tx in transactions" :key="tx.id" class="border-t text-sm hover:bg-emerald-50">
          <td class="px-4 py-2 font-medium text-gray-800">{{ tx.id }}</td>
          <td class="px-4 py-2">{{ tx.Merchant?.companyName || 'N/A' }}</td>
          <td class="px-4 py-2">{{ tx.amount.toFixed(2) }}</td>
          <td class="px-4 py-2">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  tx.status === 'success' ? 'bg-green-100 text-green-700' :
                  tx.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                ]"
              >
                {{ tx.status }}
              </span>
          </td>
          <td class="px-4 py-2">{{ formatDate(tx.createdAt) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <p v-if="transactions.length === 0" class="text-center text-gray-500 mt-6">Aucune transaction trouvée.</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const token = localStorage.getItem('admin_token')

const search = ref('')
const status = ref('')
const merchantId = ref('')
const transactions = ref([])

const fetchTransactions = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.get(`${apiUrl}/admin/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        query: search.value,
        status: status.value,
        merchantId: merchantId.value
      }
    })
    transactions.value = data.transactions
  } catch (err) {
    console.error('Erreur récupération transactions', err)
    transactions.value = []
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('fr-FR')
}

onMounted(fetchTransactions)
</script>
