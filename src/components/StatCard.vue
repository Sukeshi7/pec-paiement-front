<template>
  <div class="bg-white p-4 rounded shadow text-center">
    <h3 class="text-sm text-gray-500">{{ title }}</h3>
    <p class="text-2xl font-bold text-gray-800">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number]
})
</script>
