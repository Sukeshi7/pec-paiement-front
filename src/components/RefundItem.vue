<template>
	<div class="bg-white p-6 rounded-xl shadow-sm">
		<div class="flex justify-between items-center mb-4">
			<div>
				<p class="text-lg font-semibold text-emerald-700">Transaction {{ transaction.id }}</p>
				<p class="text-sm text-gray-600">Client : {{ transaction.client }} • Date : {{ transaction.date }}</p>
			</div>
			<div>
				<p class="text-sm text-gray-600">Montant total : {{ transaction.montant }} €</p>
				<p class="text-sm text-gray-600">Restant à rembourser : {{ transaction.montantRestant }} €</p>
			</div>
		</div>

		<RefundForm :transaction="transaction" />
		<RefundHistory :refunds="transaction.refunds" />
	</div>
</template>

<script setup>
import RefundForm from './RefundForm.vue'
import RefundHistory from './RefundHistory.vue'

defineProps({
	transaction: Object
})
</script>
