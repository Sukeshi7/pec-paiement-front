<template>
	<form @submit.prevent="submitRefund" class="flex gap-4 items-center mb-4">
		<input
			type="number"
			v-model.number="amount"
			:max="transaction.montantRestant"
			:placeholder="`Montant (max ${transaction.montantRestant} €)`"
			class="border px-4 py-2 rounded-lg shadow-sm w-48 focus:ring-emerald-500 focus:border-emerald-500"
		/>
		<button
			type="submit"
			class="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
		>
			Rembourser
		</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	transaction: Object
})

const amount = ref(null)

const submitRefund = () => {
	if (!amount.value || amount.value <= 0 || amount.value > props.transaction.montantRestant) {
		alert('Montant invalide')
		return
	}

	const newRefund = {
		id: 'RF' + Math.floor(Math.random() * 10000),
		montant: amount.value,
		date: new Date().toISOString().split('T')[0]
	}

	props.transaction.refunds.push(newRefund)
	props.transaction.montantRestant -= amount.value
	amount.value = null
}
</script>
