<script setup>
import { ref, onMounted, computed } from 'vue'
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

import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartStats = ref(null)
const merchant = ref(null)
const transactions = ref([])
const showRefundModal = ref(false)
const selectedTransaction = ref(null)
const newAppSecret = ref('')
const error = ref('')
const token = localStorage.getItem('token')
const apiUrl = import.meta.env.VITE_API_URL

const fetchChartStats = async () => {
  try {
    const response = await axios.get(`${apiUrl}/merchants/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    chartStats.value = response.data
  } catch (err) {
    console.error('Erreur récupération stats chart', err)
  }
}

onMounted(() => {
  fetchMerchant()
  fetchChartStats()
})

const barData = computed(() => {
  if (!chartStats.value) return null
  return {
    labels: ['Succès', 'Échecs'],
    datasets: [
      {
        label: 'Montant (€)',
        data: [
          chartStats.value.totalAmountSuccess,
          chartStats.value.totalAmountFailed
        ],
        backgroundColor: ['#10B981', '#EF4444']
      }
    ]
  }
})

const dailyData = computed(() => {
  if (!chartStats.value) return null
  return {
    labels: chartStats.value.transactionsPerDay.map(t => t.date),
    datasets: [
      {
        label: 'Transactions / jour',
        data: chartStats.value.transactionsPerDay.map(t => t.count),
        backgroundColor: '#3B82F6'
      }
    ]
  }
})



const fetchMerchant = async () => {
  try {
    const response = await axios.get(`${apiUrl}/merchants/me`, {
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
    const response = await axios.get(`${apiUrl}/transactions/merchant`, {
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
      `${apiUrl}/merchants/regenerate-credentials`,
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
  <div class="min-h-screen bg-gray-50 py-10 px-4 font-satoshi">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 class="text-3xl font-bold text-emerald-700 mb-8 text-center flex items-center gap-2 justify-center">
        <CreditCardIcon class="w-7 h-7" /> Tableau de bord Marchand
      </h1>

      <div v-if="merchant" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p class="text-sm text-emerald-800">Nom de la société</p>
          <p class="font-semibold text-gray-900">{{ merchant.companyName }}</p>
        </div>
        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p class="text-sm text-emerald-800">Email de contact</p>
          <p class="font-semibold text-gray-900">{{ merchant.contactEmail }}</p>
        </div>
        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p class="text-sm text-emerald-800">Devise</p>
          <p class="font-semibold text-gray-900">{{ merchant.currency }}</p>
        </div>
        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p class="text-sm text-emerald-800">APP ID</p>
          <p class="font-mono text-xs break-all text-emerald-700">{{ merchant.appId }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <button @click="regenerateCredentials"
                class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow flex items-center gap-2">
          <KeyIcon class="w-5 h-5" /> Régénérer APP_SECRET
        </button>
      </div>

      <div v-if="newAppSecret" class="mb-6 p-4 bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300">
        <strong>Nouveau APP_SECRET :</strong>
        <code class="break-all text-sm">{{ newAppSecret }}</code>
      </div>

      <div v-if="error" class="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
        {{ error }}
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <div class="bg-white p-4 border rounded-xl shadow">
          <h2 class="font-semibold text-gray-700 mb-4">Montants des transactions</h2>
          <Bar v-if="barData" :data="barData" />
        </div>
        <div class="bg-white p-4 border rounded-xl shadow">
          <h2 class="font-semibold text-gray-700 mb-4">Transactions par jour</h2>
          <Bar v-if="dailyData" :data="dailyData" />
        </div>
      </div>

      <div v-if="transactions.length" class="overflow-x-auto">
        <h2 class="text-xl font-semibold text-emerald-800 mb-4">Transactions</h2>
        <table class="min-w-full bg-white border text-sm rounded-lg overflow-hidden shadow-sm">
          <thead>
          <tr class="bg-emerald-100 text-emerald-900">
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
          <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-emerald-50">
            <td class="px-4 py-2 border">{{ tx.id }}</td>
            <td class="px-4 py-2 border">{{ tx.amount }}</td>
            <td class="px-4 py-2 border">{{ tx.currency }}</td>
            <td class="px-4 py-2 border">
                <span :class="{
                  'text-emerald-600': tx.status === 'success',
                  'text-red-600': tx.status === 'failed',
                  'text-yellow-600': tx.status === 'pending'
                }">
                  {{ tx.status }}
                </span>
            </td>
            <td class="px-4 py-2 border">
              <a :href="tx.paymentUrl" target="_blank" class="text-emerald-700 underline">Lien</a>
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
              <button
                v-if="tx.status === 'success'"
                @click="openRefundModal(tx)"
                class="text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded flex items-center gap-1"
              >
                <ArrowUturnLeftIcon class="w-4 h-4" /> Rembourser
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <RefundModal
      :visible="showRefundModal"
      :transactionId="selectedTransaction?.id"
      @close="showRefundModal = false"
      @refunded="onRefundSuccess"
    />
  </div>
</template>
