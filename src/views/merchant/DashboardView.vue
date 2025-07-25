<script setup>
import KpiCard from '@/components/KpiCard.vue'
import TransactionTable from '@/components/TransactionTable.vue'
import Header from '@/components/AppHeader.vue'
import { ref } from 'vue'

const stats = ref({
	transactions: 12,
	total: 1635.50,
	conversion: 68.3
})

const latestTransactions = ref([
	{ id: 'TX123', montant: 150, statut: 'Succès', date: '2025-07-21', client: 'Alice' },
	{ id: 'TX124', montant: 280, statut: 'Échec', date: '2025-07-20', client: 'Bob' },
	{ id: 'TX125', montant: 90, statut: 'Succès', date: '2025-07-18', client: 'Charlie' },
])
</script>

<template>
	<Header />
	<section class="py-10 font-satoshi">
		<div class="max-w-7xl mx-auto px-4">
			<h1 class="text-3xl font-bold text-emerald-700 mb-6">Tableau de bord Marchand</h1>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
				<KpiCard title="Transactions" :value="stats.transactions" />
				<KpiCard title="Total payé (€)" :value="stats.total" />
				<KpiCard title="Taux de conversion" :value="stats.conversion + '%'" />
			</div>

			<div class="bg-white shadow-md rounded-xl p-6">
				<h2 class="text-xl font-semibold mb-4 text-emerald-700">Dernières transactions</h2>
				<TransactionTable :transactions="latestTransactions" />
			</div>
		</div>
	</section>
</template>
