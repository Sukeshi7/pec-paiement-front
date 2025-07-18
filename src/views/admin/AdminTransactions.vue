<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">💳 Transactions</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <table v-else class="w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3">Montant</th>
          <th class="p-3">Devise</th>
          <th class="p-3">Statut</th>
          <th class="p-3">Marchand</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactions" :key="t.id" class="border-b hover:bg-gray-50">
          <td>{{ t.amount }} </td>
          <td>{{ t.currency }}</td>
          <td>{{ t.status }}</td>
          <td>
            {{ t.merchant ? t.merchant.companyName : 'Non lié' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminTransactions',
  data() {
    return {
      transactions: [],
      loading: true,
      error: '',
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('http://localhost:3000/admin/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('Erreur lors du chargement des transactions')

      const data = await res.json()
      console.log('transaction', data)
      this.transactions = data.transactions
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  },
}
</script>
