<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-satoshi">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg border border-emerald-200">
      <h2 class="text-xl font-bold text-emerald-700 mb-4">Rembourser une transaction</h2>

      <p class="mb-2 text-sm text-gray-600">
        Transaction ID : <strong>{{ transactionId }}</strong>
      </p>

      <input
        v-model.number="refundAmount"
        type="number"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Montant à rembourser"
      />

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
        >
          Annuler
        </button>
        <button
          @click="submitRefund"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
        >
          Confirmer
        </button>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  visible: Boolean,
  transactionId: Number,
})

const emit = defineEmits(['close', 'refunded'])

const refundAmount = ref(null)
const error = ref('')

const submitRefund = async () => {
  error.value = ''
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.post(
      `${apiUrl}/transactions/${props.transactionId}/refund`,
      { amount: refundAmount.value }
    )
    alert(data.message)
    emit('refunded')
    emit('close')
  } catch (err) {
    error.value = err.response?.data?.error || 'Erreur lors du remboursement.'
  }
}
</script>
