<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Rembourser une transaction</h2>

      <p class="mb-2 text-sm text-gray-600">
        Transaction ID : <strong>{{ transactionId }}</strong>
      </p>

      <input
        v-model.number="refundAmount"
        type="number"
        class="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Montant à rembourser"
      />

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        >
          Annuler
        </button>
        <button
          @click="submitRefund"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
        >
          Confirmer
        </button>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
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
    const { data } = await axios.post(
      `http://localhost:3000/transactions/${props.transactionId}/refund`,
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
