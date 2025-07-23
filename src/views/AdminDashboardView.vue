<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Pie, Bar } from 'vue-chartjs'
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

onMounted(fetchStats)

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
    <AdminTransactionView/>
    <AdminMerchantsTableView/>
  </div>
</template>
