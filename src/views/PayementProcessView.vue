<template>
  <div class="h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
    <h1 class="text-2xl font-semibold text-gray-800 mb-2">Paiement en cours...</h1>
    <p class="text-gray-600">Merci de patienter pendant le traitement de votre paiement.</p>
    <div class="mt-8 animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 border-opacity-50"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const transactionId = localStorage.getItem('lastTransactionId')
const apiUrl = import.meta.env.VITE_API_URL
const checkStatus = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/transactions/${transactionId}`)

    if (data.status === 'success') {
      localStorage.removeItem('cart')
      window.location.href = data.redirectSuccessUrl
    } else if (data.status === 'failed' || data.status === 'cancelled') {
      localStorage.removeItem('cart')
      window.location.href = data.redirectCancelUrl
    }
  } catch (err) {
    console.error('[FRONT] Erreur lors de la vérification du statut :', err.message)
  }
}

onMounted(() => {
  const interval = setInterval(checkStatus, 3000)
  setTimeout(() => clearInterval(interval), 30000)
})
</script>
