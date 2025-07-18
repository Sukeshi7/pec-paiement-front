<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RefundModal from '@/components/RefundModalView.vue'
import {
  KeyIcon,
  PlusIcon,
  CreditCardIcon,
  CurrencyEuroIcon,
  ClockIcon,
  ArrowUturnLeftIcon
} from '@heroicons/vue/24/solid'

const merchant = ref(null)
const transactions = ref([])
const showRefundModal = ref(false)
const selectedTransaction = ref(null)
const newAppSecret = ref('')
const error = ref('')
const token = localStorage.getItem('token')

const fetchMerchant = async () => {
  try {
    const response = await axios.get('http://localhost:3000/merchants/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    merchant.value = response.data.merchant
    fetchTransactions()
  } catch (err) {
    const msg = err.response?.data?.error || 'Erreur de chargement du profil.'
    error.value = msg
    if (msg.includes('Token invalide') || msg.includes('expiré')) {
      localStorage.removeItem('token')
      alert('Session expirée. Merci de vous reconnecter.')
      window.location.href = '/login'
    }
  }
}

const fetchTransactions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/transactions/merchant', {
      headers: { Authorization: `Bearer ${token}` },
    })
    transactions.value = response.data.transactions
  } catch (err) {
    error.value = 'Erreur lors du chargement des transactions'
  }
}

const regenerateCredentials = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/merchants/regenerate-credentials',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    newAppSecret.value = response.data.appSecret
    alert('Nouveau APP_SECRET : ' + newAppSecret.value)
  } catch (err) {
    error.value = err.response?.data?.error || 'Erreur lors de la régénération.'
  }
}

const openRefundModal = (transaction) => {
  console.log('test');
  selectedTransaction.value = transaction
  showRefundModal.value = true
}

const onRefundSuccess = () => {
  fetchTransactions()
  showRefundModal.value = false
}

onMounted(fetchMerchant)
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold text-amber-600 mb-8 text-center flex items-center gap-2 justify-center">
        <CreditCardIcon class="w-7 h-7" /> Espace Marchand
      </h1>

      <div v-if="merchant" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-100 rounded p-4 border">
          <p class="text-sm text-gray-500">Nom de la société</p>
          <p class="font-semibold text-gray-800">{{ merchant.companyName }}</p>
        </div>
        <div class="bg-gray-100 rounded p-4 border">
          <p class="text-sm text-gray-500">Email de contact</p>
          <p class="font-semibold text-gray-800">{{ merchant.contactEmail }}</p>
        </div>
        <div class="bg-gray-100 rounded p-4 border">
          <p class="text-sm text-gray-500">Devise</p>
          <p class="font-semibold text-gray-800">{{ merchant.currency }}</p>
        </div>
        <div class="bg-gray-100 rounded p-4 border">
          <p class="text-sm text-gray-500">APP ID</p>
          <p class="font-mono text-xs break-all text-amber-700">{{ merchant.appId }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <button @click="regenerateCredentials"
          class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded shadow flex items-center gap-2">
          <KeyIcon class="w-5 h-5" /> Régénérer APP_SECRET
        </button>

        <router-link to="/dashboard/create-transaction"
          class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded shadow flex items-center gap-2 text-center justify-center">
          <PlusIcon class="w-5 h-5" /> Créer une transaction
        </router-link>
      </div>

      <div v-if="newAppSecret" class="mb-6 p-4 bg-amber-100 text-amber-800 rounded">
        <strong>Nouveau APP_SECRET :</strong>
        <code class="break-all text-sm">{{ newAppSecret }}</code>
      </div>

      <div v-if="error" class="mb-6 p-4 bg-red-100 text-red-800 rounded">
        {{ error }}
      </div>

      <div v-if="transactions.length" class="overflow-x-auto">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Transactions</h2>
        <table class="min-w-full bg-white border text-sm">
          <thead>
            <tr class="bg-amber-100 text-gray-800">
              <th class="text-left px-4 py-2 border">#ID</th>
              <th class="text-left px-4 py-2 border">Montant</th>
              <th class="text-left px-4 py-2 border">Devise</th>
              <th class="text-left px-4 py-2 border">Statut</th>
              <th class="text-left px-4 py-2 border">URL Paiement</th>
              <th class="text-left px-4 py-2 border">Opérations</th>
              <th class="text-left px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 border">{{ tx.id }}</td>
              <td class="px-4 py-2 border">{{ tx.amount }}</td>
              <td class="px-4 py-2 border">{{ tx.currency }}</td>
              <td class="px-4 py-2 border">
                <span :class="{
                  'text-green-600': tx.status === 'success',
                  'text-red-600': tx.status === 'failed',
                  'text-yellow-600': tx.status === 'pending'
                }">
                  {{ tx.status }}
                </span>
              </td>
              <td class="px-4 py-2 border">
                <a :href="tx.paymentUrl" target="_blank" class="text-amber-600 underline">Lien</a>
              </td>
              <td class="px-4 py-2 border">
                <ul>
                  <li v-for="op in tx.Operations" :key="op.id" class="flex items-center gap-2">
                    <ClockIcon class="w-4 h-4 text-gray-400" />
                    <span class="text-gray-700">{{ op.type }} – {{ op.status }} – {{ op.amount }}</span>
                  </li>
                </ul>
              </td>
              <td class="px-4 py-2 border">
                <button v-if="tx.status === 'success'" @click="openRefundModal(tx)"
                  class="text-white bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded flex items-center gap-1">
                  <ArrowUturnLeftIcon class="w-4 h-4" /> Rembourser
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <RefundModal :visible="showRefundModal" :transactionId="selectedTransaction?.id" @close="showRefundModal = false"
      @refunded="onRefundSuccess" />

  </div>
</template>
