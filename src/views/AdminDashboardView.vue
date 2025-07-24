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
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

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
    const response = await axios.get(`${apiUrl}/admin/graph-data`, {
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
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B']
    }]
  }
})

const barData = computed(() => {
  if (!advancedStats.value) return { labels: [], datasets: [] }
  return {
    labels: ['Succès', 'Échecs'],
    datasets: [
      {
        label: 'Montant total (€)',
        data: [
          advancedStats.value.totalAmountSuccess,
          advancedStats.value.totalAmountFailed
        ],
        backgroundColor: ['#10B981', '#EF4444']
      }
    ]
  }
})

const dailyData = computed(() => {
  if (!advancedStats.value || !advancedStats.value.transactionsPerDay) return { labels: [], datasets: [] }
  return {
    labels: advancedStats.value.transactionsPerDay.map(t => t.date),
    datasets: [
      {
        label: 'Transactions / jour',
        data: advancedStats.value.transactionsPerDay.map(t => t.count),
        backgroundColor: '#3B82F6'
      }
    ]
  }
})

const dailyAmountData = computed(() => {
  if (!advancedStats.value || !advancedStats.value.transactionsPerDay) return { labels: [], datasets: [] }
  return {
    labels: advancedStats.value.transactionsPerDay.map(t => t.date),
    datasets: [
      {
        label: 'Montant (€) / jour',
        data: advancedStats.value.transactionsPerDay.map(t => t.amount),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  }
})

</script>

<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <h1 class="text-3xl font-bold text-amber-600 mb-8 text-center">Tableau de bord Administrateur</h1>

    <div v-if="error" class="bg-red-100 text-red-800 p-4 rounded mb-6">{{ error }}</div>

    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white shadow p-6 rounded border">
        <h2 class="text-gray-500 text-sm mb-1">Marchands</h2>
        <p class="text-3xl font-bold text-gray-800">{{ stats.merchants }}</p>
      </div>
      <div class="bg-white shadow p-6 rounded border">
        <h2 class="text-gray-500 text-sm mb-1">Transactions</h2>
        <p class="text-3xl font-bold text-gray-800">{{ stats.transactions }}</p>
      </div>
      <div class="bg-white shadow p-6 rounded border">
        <h2 class="text-gray-500 text-sm mb-1">Montant total (€)</h2>
        <p class="text-3xl font-bold text-gray-800">{{ stats.totalAmount.toFixed(2) }}</p>
      </div>
      <div class="bg-white shadow p-6 rounded border">
        <h2 class="text-gray-500 text-sm mb-1">Succès</h2>
        <p class="text-3xl font-bold text-green-600">{{ stats.successCount }}</p>
      </div>
      <div class="bg-white shadow p-6 rounded border">
        <h2 class="text-gray-500 text-sm mb-1">Taux de succès (%)</h2>
        <p class="text-3xl font-bold text-amber-600">{{ stats.successRate }}%</p>
      </div>

    </div>

    <div class="bg-white p-6 rounded shadow border max-w-2xl mx-auto">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Répartition des statuts (Pie Chart)</h2>
      <Pie v-if="pieData" :data="pieData" />
    </div>
    <div class="bg-white p-6 mt-8 rounded shadow border max-w-3xl mx-auto">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Montants des transactions</h2>
      <Bar v-if="barData" :data="barData" />
    </div>

    <div class="bg-white p-6 mt-8 rounded shadow border max-w-3xl mx-auto">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Transactions par jour</h2>
      <Bar v-if="dailyData" :data="dailyData" />
    </div>
    <div class="bg-white p-6 mt-8 rounded shadow border max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Montant total par jour</h2>
      <Line v-if="dailyAmountData" :data="dailyAmountData" />
    </div>


    <AdminTransactionView />
    <AdminMerchantsTableView />
  </div>
</template>
