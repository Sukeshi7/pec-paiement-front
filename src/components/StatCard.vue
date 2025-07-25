<template>
  <div class="bg-white p-4 rounded-xl shadow-md text-center border border-emerald-100 font-satoshi">
    <h3 class="text-sm text-gray-500">{{ title }}</h3>
    <p class="text-2xl font-bold text-emerald-700">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number]
})
</script>
