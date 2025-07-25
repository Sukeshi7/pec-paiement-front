<template>
	<div class="overflow-x-auto">
		<table class="min-w-full bg-white rounded-xl shadow-sm text-sm">
			<thead class="bg-emerald-100 text-emerald-800 uppercase text-xs tracking-wider">
			<tr>
				<th class="px-4 py-3 text-left">ID</th>
				<th class="px-4 py-3 text-left">Client</th>
				<th class="px-4 py-3 text-left">Montant (€)</th>
				<th class="px-4 py-3 text-left">Statut</th>
				<th class="px-4 py-3 text-left">Date</th>
			</tr>
			</thead>
			<tbody>
			<tr
				v-for="tx in transactions"
				:key="tx.id"
				class="border-b hover:bg-gray-50"
			>
				<td class="px-4 py-3 font-medium">{{ tx.id }}</td>
				<td class="px-4 py-3">{{ tx.client }}</td>
				<td class="px-4 py-3">{{ tx.montant.toFixed(2) }}</td>
				<td class="px-4 py-3">
            <span
				:class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                tx.statut === 'Succès' ? 'bg-green-100 text-green-700' :
                tx.statut === 'Échec' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              ]"
			>
              {{ tx.statut }}
            </span>
				</td>
				<td class="px-4 py-3 text-gray-500">{{ tx.date }}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
defineProps({
	transactions: Array
})
</script>
