<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'
const transaction = ref(null)
const refundAmount = ref(0)
const message = ref('')

const transactionId = localStorage.getItem('lastTransactionId')
const apiUrl = import.meta.env.VITE_API_URL
const fetchTransaction = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/transactions/merchant`, {
            headers: {
                Authorization: `Bearer ${merchantToken}`
            }
        })
        console.log('test', data);
        transaction.value = data.transactions.find(t => t.id == transactionId)
        refundAmount.value = transaction.value?.amount || 0
    } catch (err) {
        console.error(err)
    }
}

const requestRefund = async () => {
    try {
        await axios.post(`${apiUrl}/transactions/${transactionId}/refund`, {
            transactionId,
            amount: refundAmount.value
        })

        message.value = `Remboursement de ${refundAmount.value}€ effectué.`
        fetchTransaction()
    } catch (err) {
        console.error(err)
        message.value = 'Erreur lors du remboursement.'
    }
}

onMounted(fetchTransaction)
</script>

<template>
  <SiteTestNavbarView />
  <div class="max-w-4xl mx-auto mt-10 font-satoshi">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-emerald-100">
      <h2 class="text-2xl font-bold mb-6 text-emerald-700">Transaction et Remboursement</h2>

      <div v-if="!transaction">
        <p class="text-gray-600">Chargement de la transaction...</p>
      </div>

      <div v-else>
        <div class="mb-4 text-gray-800">
          <p><strong>ID :</strong> {{ transaction.id }}</p>
          <p><strong>Montant :</strong> {{ transaction.amount }} {{ transaction.currency }}</p>
          <p><strong>Statut :</strong> {{ transaction.status }}</p>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Montant à rembourser</label>
          <input v-model.number="refundAmount" type="number" :max="transaction.amount"
                 class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        <button @click="requestRefund"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
          Demander un remboursement
        </button>

        <div v-if="message" class="mt-4 text-green-600 font-medium">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

