<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const stats = ref({})
const token = localStorage.getItem('admin_token')

const fetchStats = async () => {
  try {
    const res = await axios.get('http://localhost:3000/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchStats)

const pieData = computed(() => ({
  labels: ['Succès', 'Échecs'],
  datasets: [{
    label: 'Répartition des transactions',
    data: [stats.value.successCount || 0, (stats.value.transactions || 0) - (stats.value.successCount || 0)],
    backgroundColor: ['#f59e0b', '#d1d5db'],
  }]
}))
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-bold text-amber-600 mb-8">Dashboard Admin</h1>


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="bg-white p-4 rounded shadow border-l-4 border-amber-500">
        <p class="text-sm text-gray-500">Marchands</p>
        <p class="text-2xl font-semibold">{{ stats.merchants }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow border-l-4 border-amber-500">
        <p class="text-sm text-gray-500">Transactions</p>
        <p class="text-2xl font-semibold">{{ stats.transactions }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow border-l-4 border-amber-500">
        <p class="text-sm text-gray-500">Total Capturé (€)</p>
        <p class="text-2xl font-semibold">{{ stats.totalCaptured }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow border-l-4 border-amber-500">
        <p class="text-sm text-gray-500">Total Remboursé (€)</p>
        <p class="text-2xl font-semibold">{{ stats.totalRefunded }}</p>
      </div>
    </div>


    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Taux de succès</h2>
      <Pie :data="pieData" />
    </div>
  </div>
</template>
