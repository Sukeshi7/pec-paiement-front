<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const transaction = ref(null)
const error = ref('')
const loading = ref(true)
const apiUrl = import.meta.env.VITE_API_URL
const fetchTransaction = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/payment/${route.params.id}`)
    transaction.value = data.transaction
  } catch (err) {
    error.value = 'Transaction introuvable.'
  } finally {
    loading.value = false
  }
}

const confirmPayment = async () => {
  await axios.post(`${apiUrl}/${route.params.id}/confirm`)
  window.location.href = transaction.value.redirectSuccessUrl
}

const cancelPayment = async () => {
  await axios.post(`${apiUrl}/payment/${route.params.id}/cancel`)
  window.location.href = transaction.value.redirectCancelUrl
}

onMounted(fetchTransaction)
</script>

<template>
  <div class="max-w-2xl mx-auto mt-16 p-6 bg-white rounded shadow text-center">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Simulateur de Paiement</h2>

    <div v-if="loading" class="text-gray-600">Chargement...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else>
      <p class="text-lg mb-6">
        Payer <strong>{{ transaction.amount }} {{ transaction.currency }}</strong>
      </p>

      <div class="flex justify-center gap-6">
        <button @click="confirmPayment" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Confirmer le paiement
        </button>
        <button @click="cancelPayment" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
