<template>
  <SiteTestNavbarView />
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-6xl mx-auto p-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded shadow">
        <h2 class="text-2xl font-bold mb-6">Paiement sécurisé</h2>

        <form @submit.prevent="submitPayment" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nom complet</label>
            <input v-model="card.name" placeholder="Jean Dupont"
              class="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:outline-none"
              required />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Numéro de carte</label>
            <input v-model="card.number" placeholder="4242 4242 4242 4242" maxlength="19"
              class="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:outline-none"
              required />
          </div>

          <div class="flex gap-4">
            <div class="w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Expiration</label>
              <input v-model="card.expiry" placeholder="MM/YY" maxlength="5"
                class="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:outline-none"
                required />
            </div>
            <div class="w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">CVC</label>
              <input v-model="card.cvc" placeholder="123" maxlength="4"
                class="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:outline-none"
                required />
            </div>
          </div>

          <button type="submit"
            class="w-full bg-amber-600 text-white font-semibold py-3 rounded hover:bg-amber-700 transition"
            :disabled="loading">
            {{ loading ? 'Paiement en cours...' : `Payer ${total} €` }}
          </button>
        </form>

        <p v-if="error" class="text-red-600 mt-4 text-sm">{{ error }}</p>
      </div>

      <div class="bg-white p-6 rounded shadow">
        <h3 class="text-xl font-bold mb-4">Votre panier</h3>
        <ul class="space-y-2">
          <li v-for="(item, index) in cart" :key="index" class="flex justify-between text-gray-800">
            <span>{{ item.name }}</span>
            <span>{{ item.price }} €</span>
          </li>
        </ul>
        <hr class="my-4" />
        <div class="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{{ total }} €</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue'

const router = useRouter()

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

const total = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0))
const apiUrl = import.meta.env.VITE_API_URL
const card = ref({
  name: '',
  number: '',
  expiry: '',
  cvc: ''
})

const loading = ref(false)
const error = ref('')

const submitPayment = async () => {
  const transactionId = localStorage.getItem('lastTransactionId')

  if (!transactionId) {
    error.value = 'Transaction introuvable. Veuillez réessayer.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await axios.post(`${apiUrl}/transactions/pay/${transactionId}`, {
      card: card.value
    })
    router.push('/siteTest/payment-processing')
  } catch (err) {
    console.error(err)
    error.value = 'Une erreur est survenue pendant le paiement.'
  } finally {
    loading.value = false
  }
}
</script>
