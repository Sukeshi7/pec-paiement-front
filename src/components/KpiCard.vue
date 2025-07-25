<template>
	<div class="bg-emerald-50 p-4 rounded-xl text-center shadow-sm">
		<p class="text-gray-500 text-sm">{{ title }}</p>
		<p class="text-2xl font-bold text-emerald-700 mt-1">{{ value }}</p>
	</div>
</template>

<script setup>
defineProps({
	title: String,
	value: [String, Number]
})
</script>
