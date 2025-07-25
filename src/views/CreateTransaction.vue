<template>
  <div class="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-emerald-300 font-satoshi">
    <h2 class="text-3xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
      <CreditCard class="w-7 h-7 text-emerald-700" /> Créer une transaction
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="flex items-center gap-2 mb-1 font-semibold text-gray-700">
          <Euro class="w-4 h-4 text-emerald-500" /> Montant (€)
        </label>
        <input
          v-model="amount"
          type="number"
          class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label class="flex items-center gap-2 mb-1 font-semibold text-gray-700">
          <CreditCard class="w-4 h-4 text-emerald-500" /> Devise
        </label>
        <select
          v-model="currency"
          class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          <option value="EUR">Euro (EUR)</option>
          <option value="USD">Dollar (USD)</option>
        </select>
      </div>

      <div>
        <label class="flex items-center gap-2 mb-1 font-semibold text-gray-700">
          <Globe class="w-4 h-4 text-emerald-500" /> URL de succès
        </label>
        <input
          v-model="redirectSuccessUrl"
          type="url"
          class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label class="flex items-center gap-2 mb-1 font-semibold text-gray-700">
          <Ban class="w-4 h-4 text-emerald-500" /> URL d’annulation
        </label>
        <input
          v-model="redirectCancelUrl"
          type="url"
          class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label class="flex items-center gap-2 mb-1 font-semibold text-gray-700">
          <Webhook class="w-4 h-4 text-emerald-500" /> Webhook URL
        </label>
        <input
          v-model="callbackUrl"
          type="url"
          class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-emerald-700 transition duration-200"
      >
        Créer la transaction
      </button>
    </form>

    <div v-if="paymentUrl" class="mt-8 p-4 bg-emerald-50 border border-emerald-300 rounded">
      <p class="font-medium text-emerald-700">Lien de paiement généré :</p>
      <a
        :href="paymentUrl"
        target="_blank"
        class="text-emerald-700 underline break-all"
      >{{ paymentUrl }}</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { CreditCard, Euro, Globe, Ban, Webhook } from 'lucide-vue-next'

const amount = ref(100)
const currency = ref('EUR')
const redirectSuccessUrl = ref('https://google.com/success')
const redirectCancelUrl = ref('https://bing.com/cancel')
const callbackUrl = ref('https://webhook.site/test')
const paymentUrl = ref('')
const apiUrl = import.meta.env.VITE_API_URL

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post(
      `${apiUrl}/transactions`,
      {
        amount: amount.value,
        currency: currency.value,
        redirectSuccessUrl: redirectSuccessUrl.value,
        redirectCancelUrl: redirectCancelUrl.value,
        callbackUrl: callbackUrl.value
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    paymentUrl.value = response.data.paymentUrl
  } catch (err) {
    console.error('Erreur création transaction', err.response?.data || err.message)
    alert('Erreur lors de la création de la transaction.')
  }
}
</script>
