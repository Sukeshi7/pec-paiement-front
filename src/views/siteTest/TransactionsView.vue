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
        const merchantToken = localStorage.getItem('merchantToken')

        const { data } = await axios.get(`${apiUrl}/transactions/merchant`, {
            headers: {
                Authorization: `Bearer ${merchantToken}`
            }
        })

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
    <div class="max-w-4xl mx-auto mt-8">
      
        <div class="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Transaction et Remboursement</h2>

            <div v-if="!transaction">
                <p class="text-gray-600">Chargement de la transaction...</p>
            </div>

            <div v-else>
                <div class="mb-4">
                    <p><strong>ID :</strong> {{ transaction.id }}</p>
                    <p><strong>Montant :</strong> {{ transaction.amount }} {{ transaction.currency }}</p>
                    <p><strong>Statut :</strong> {{ transaction.status }}</p>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700">Montant à rembourser</label>
                    <input v-model.number="refundAmount" type="number" :max="transaction.amount"
                        class="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                </div>

                <button @click="requestRefund" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                    Demander un remboursement
                </button>

                <div v-if="message" class="mt-4 text-green-600">
                    {{ message }}
                </div>
            </div>
        </div>

    </div>
</template>


