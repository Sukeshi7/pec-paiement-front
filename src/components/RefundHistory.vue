<template>
	<div v-if="refunds.length > 0" class="border-t pt-4 mt-4">
		<h3 class="text-sm font-medium text-gray-700 mb-2">Historique des remboursements :</h3>
		<ul class="space-y-1 text-sm text-gray-600">
			<li v-for="rf in refunds" :key="rf.id">
				• {{ rf.date }} – {{ rf.montant.toFixed(2) }} €
			</li>
		</ul>
	</div>
</template>

<script setup>
defineProps({
	refunds: Array
})
</script>
