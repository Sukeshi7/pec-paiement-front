<script setup>
import { ref } from 'vue'
import axios from 'axios'

const transactionId = ref('')
const amount = ref('')
const callbackUrl = ref('')
const result = ref('')
const loading = ref(false)

const simulatePayment = async () => {
  loading.value = true
  result.value = ''
  try {
    const response = await axios.post('http://localhost:4000/psp/pay', {
      transactionId: transactionId.value,
      amount: parseFloat(amount.value),
      callbackUrl: callbackUrl.value
    })
    result.value = response.data.message
  } catch (err) {
    result.value = `Erreur : ${err.response?.data?.error || err.message}`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Simulateur de Paiement PSP</h2>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Transaction ID</label>
      <input v-model="transactionId" class="w-full border rounded px-3 py-2" />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Montant</label>
      <input v-model="amount" type="number" class="w-full border rounded px-3 py-2" />
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Callback URL</label>
      <input v-model="callbackUrl" class="w-full border rounded px-3 py-2" />
    </div>

    <button
      @click="simulatePayment"
      :disabled="loading"
      class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
    >
      {{ loading ? 'Simulation en cours...' : 'Simuler le Paiement' }}
    </button>

    <div v-if="result" class="mt-4 text-sm text-blue-600">
      {{ result }}
    </div>
  </div>
</template>
