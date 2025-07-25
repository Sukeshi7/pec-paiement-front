<template>
	<Header />
	<section class="py-10 font-satoshi">

		<div class="max-w-7xl mx-auto px-4">
			<h1 class="text-3xl font-bold text-emerald-700 mb-6">Toutes les transactions</h1>

			<!-- Barre de recherche et filtres -->
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<input
					v-model="search"
					type="text"
					placeholder="🔍 Rechercher par ID ou client"
					class="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
				/>

				<select
					v-model="selectedStatus"
					class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
				>
					<option value="">Tous les statuts</option>
					<option value="Succès">Succès</option>
					<option value="Échec">Échec</option>
					<option value="En attente">En attente</option>
				</select>
			</div>

			<!-- Table -->
			<TransactionTable :transactions="filteredTransactions" />
		</div>
	</section>
</template>

<script setup>
import Header from '@/components/AppHeader.vue'
import TransactionTable from '@/components/TransactionTable.vue'
import { ref, computed } from 'vue'

// Données simulées
const allTransactions = ref([
	{ id: 'TX123', montant: 150, statut: 'Succès', date: '2025-07-21', client: 'Alice' },
	{ id: 'TX124', montant: 280, statut: 'Échec', date: '2025-07-20', client: 'Bob' },
	{ id: 'TX125', montant: 90, statut: 'Succès', date: '2025-07-18', client: 'Charlie' },
	{ id: 'TX126', montant: 100, statut: 'En attente', date: '2025-07-17', client: 'Diane' },
])

const search = ref('')
const selectedStatus = ref('')

// Filtrage
const filteredTransactions = computed(() => {
	return allTransactions.value.filter(tx => {
		const matchSearch =
			tx.id.toLowerCase().includes(search.value.toLowerCase()) ||
			tx.client.toLowerCase().includes(search.value.toLowerCase())
		const matchStatus =
			!selectedStatus.value || tx.statut === selectedStatus.value
		return matchSearch && matchStatus
	})
})
</script>
