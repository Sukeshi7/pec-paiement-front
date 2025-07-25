<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const transaction = ref(null)
const refundAmount = ref(0)
const operations = ref([])
const message = ref('')
const error = ref('')
const apiUrl = import.meta.env.VITE_API_URL
const fetchTransaction = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/transactions/${route.params.id}/operations`)
    transaction.value = {
      id: data.transactionId,
    }
    operations.value = data.operations
  } catch (err) {
    error.value = 'Erreur de chargement des opérations'
  }
}

const handleRefund = async () => {
  try {
    await axios.post(`${apiUrl}/transactions/${transaction.value.id}/refund`, {
      amount: refundAmount.value,
    })
    message.value = 'Remboursement effectué avec succès'
    await fetchTransaction()
  } catch (err) {
    error.value = err.response?.data?.error || 'Erreur lors du remboursement'
  }
}

onMounted(fetchTransaction)
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-xl font-satoshi border border-emerald-100">
    <h2 class="text-2xl font-bold mb-6 text-emerald-700">Détails de la transaction #{{ transaction.id }}</h2>

    <div v-if="operations.length">
      <h3 class="font-semibold text-gray-700 mb-2">Historique des opérations :</h3>
      <ul class="mb-4 space-y-2">
        <li
          v-for="op in operations"
          :key="op.id"
          class="border p-2 rounded-lg bg-gray-50 flex justify-between items-center"
        >
          <span class="capitalize text-gray-700">{{ op.type }}</span>
          <span class="font-semibold text-gray-800">{{ op.amount }} €</span>
          <span class="text-sm text-gray-500">{{ op.createdAt.slice(0, 10) }}</span>
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-1 text-gray-700">Montant à rembourser (€)</label>
      <input
        type="number"
        v-model="refundAmount"
        min="1"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    <button
      @click="handleRefund"
      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
    >
      Rembourser
    </button>

    <div v-if="message" class="mt-4 text-green-600 font-medium">{{ message }}</div>
    <div v-if="error" class="mt-4 text-red-600 font-medium">{{ error }}</div>
  </div>
</template>

