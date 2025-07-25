<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Pie, Bar, Line } from 'vue-chartjs'
import AdminTransactionView from '@/components/AdminTransactionView.vue'
import AdminMerchantsTableView from '@/components/AdminMerchantsTableView.vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

const stats = ref(null)
const error = ref('')
const token = localStorage.getItem('admin_token')
const apiUrl = import.meta.env.VITE_API_URL

const fetchStats = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = response.data
  } catch (err) {
    error.value = 'Erreur de chargement des statistiques'
  }
}

const advancedStats = ref(null)

const fetchAdvancedStats = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/stats/graph-data`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    advancedStats.value = response.data
  } catch (err) {
    console.error('Erreur récupération des stats graphiques', err)
  }
}

onMounted(() => {
  fetchStats()
  fetchAdvancedStats()
})

const pieData = computed(() => {
  if (!stats.value) return null
  return {
    labels: ['Succès', 'Échec', 'En attente'],
    datasets: [{
      data: [
        stats.value.successCount,
        stats.value.transactions - stats.value.successCount,
        stats.value.transactions * 0.1
      ],
      backgroundColor: ['#10B981', '#EF4444', '#FBBF24']
    }]
  }
})

const barData = computed(() => {
  if (!advancedStats.value) return { labels: [], datasets: [] }
  return {
    labels: ['Succès', 'Échecs'],
    datasets: [{
      label: 'Montant total (€)',
      data: [
        advancedStats.value.totalAmountSuccess,
        advancedStats.value.totalAmountFailed
      ],
      backgroundColor: ['#10B981', '#EF4444']
    }]
  }
})

const dailyData = computed(() => {
  if (!advancedStats.value) return { labels: [], datasets: [] }
  return {
    labels: advancedStats.value.transactionsPerDay.map(t => t.date),
    datasets: [{
      label: 'Transactions / jour',
      data: advancedStats.value.transactionsPerDay.map(t => t.count),
      backgroundColor: '#34D399'
    }]
  }
})

const dailyAmountData = computed(() => {
  if (!advancedStats.value) return { labels: [], datasets: [] }
  return {
    labels: advancedStats.value.transactionsPerDay.map(t => t.date),
    datasets: [{
      label: 'Montant (€) / jour',
      data: advancedStats.value.transactionsPerDay.map(t => t.amount),
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
      fill: true
    }]
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-10 font-satoshi">
    <h1 class="text-3xl font-bold text-emerald-700 mb-10 text-center">Tableau de bord Administrateur</h1>

    <div v-if="error" class="bg-red-100 text-red-800 p-4 rounded mb-6">{{ error }}</div>

    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white shadow rounded-xl border p-6">
        <h2 class="text-sm text-gray-500 mb-1">Marchands</h2>
        <p class="text-3xl font-bold text-gray-900">{{ stats.merchants }}</p>
      </div>
      <div class="bg-white shadow rounded-xl border p-6">
        <h2 class="text-sm text-gray-500 mb-1">Transactions</h2>
        <p class="text-3xl font-bold text-gray-900">{{ stats.transactions }}</p>
      </div>
      <div class="bg-white shadow rounded-xl border p-6">
        <h2 class="text-sm text-gray-500 mb-1">Montant total (€)</h2>
        <p class="text-3xl font-bold text-gray-900">{{ stats.totalAmount.toFixed(2) }}</p>
      </div>
      <div class="bg-white shadow rounded-xl border p-6">
        <h2 class="text-sm text-gray-500 mb-1">Succès</h2>
        <p class="text-3xl font-bold text-green-600">{{ stats.successCount }}</p>
      </div>
      <div class="bg-white shadow rounded-xl border p-6">
        <h2 class="text-sm text-gray-500 mb-1">Taux de succès (%)</h2>
        <p class="text-3xl font-bold text-emerald-700">{{ stats.successRate }}%</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow border">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">Répartition des statuts</h2>
        <Pie v-if="pieData" :data="pieData" />
      </div>

      <div class="bg-white p-6 rounded-xl shadow border">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">Montants des transactions</h2>
        <Bar v-if="barData" :data="barData" />
      </div>

      <div class="bg-white p-6 rounded-xl shadow border">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">Transactions par jour</h2>
        <Bar v-if="dailyData" :data="dailyData" />
      </div>

      <div class="bg-white p-6 rounded-xl shadow border">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">Montant par jour</h2>
        <Line v-if="dailyAmountData" :data="dailyAmountData" />
      </div>
    </div>

    <AdminTransactionView />
    <AdminMerchantsTableView />
  </div>
</template>
