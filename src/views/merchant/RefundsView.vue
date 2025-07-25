<template>
	<AppHeader />
	<section class="py-10 font-satoshi">
		<div class="max-w-4xl mx-auto px-4">
			<h1 class="text-3xl font-bold text-emerald-700 mb-6">Gérer les remboursements</h1>

			<div class="space-y-8">
				<RefundItem
					v-for="tx in refundableTransactions"
					:key="tx.id"
					:transaction="tx"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import RefundItem from '@/components/RefundItem.vue'
import { ref } from 'vue'

const refundableTransactions = ref([
	{
		id: 'TX198',
		client: 'Alice',
		montant: 100,
		montantRestant: 100,
		statut: 'Succès',
		date: '2025-07-19',
		refunds: []
	},
	{
		id: 'TX199',
		client: 'Bob',
		montant: 150,
		montantRestant: 50,
		statut: 'Succès',
		date: '2025-07-18',
		refunds: [
			{ id: 'RF1', montant: 100, date: '2025-07-20' }
		]
	}
])
</script>
