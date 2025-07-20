<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center">
    <div class="text-xl font-bold text-amber-600">PEC Paiement</div>

    <div>
      <button
        v-if="isAdminLoggedIn"
        @click="logout('admin')"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Déconnexion admin
      </button>

      <button
        v-else-if="isMerchantLoggedIn"
        @click="logout('merchant')"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Déconnexion marchand
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isAdminLoggedIn = computed(() => !!localStorage.getItem('admin_token'))
const isMerchantLoggedIn = computed(() => !!localStorage.getItem('token'))

const logout = (type) => {
  if (type === 'admin') {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  } else {
    localStorage.removeItem('token')
    router.push('/login')
  }
}
</script>
