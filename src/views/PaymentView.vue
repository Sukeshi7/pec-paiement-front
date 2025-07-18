<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const transaction = ref(null)
const loading = ref(true)
const error = ref('')

const fetchTransaction = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/payment/${route.params.id}`)
    transaction.value = data.transaction
  } catch (err) {
    error.value = 'Transaction introuvable.'
  } finally {
    loading.value = false
  }
}

const confirmPayment = async () => {
  await axios.post(`http://localhost:3000/payment/${route.params.id}/confirm`)
  window.location.href = transaction.value.redirectSuccessUrl
}

const cancelPayment = async () => {
  await axios.post(`http://localhost:3000/payment/${route.params.id}/cancel`)
  window.location.href = transaction.value.redirectCancelUrl
}

onMounted(fetchTransaction)
</script>

<template>
  <div class="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow text-center">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Module de Paiement</h2>

    <div v-if="loading" class="text-gray-600">Chargement...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else>
      <p class="text-lg mb-6">
        Confirmez le paiement de
        <strong>{{ transaction.amount }} {{ transaction.currency }}</strong>
      </p>

      <div class="flex justify-center gap-6">
        <button
          @click="confirmPayment"
          class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          <CheckCircleIcon class="w-5 h-5" />
          Confirmer
        </button>

        <button
          @click="cancelPayment"
          class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          <XCircleIcon class="w-5 h-5" />
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>
