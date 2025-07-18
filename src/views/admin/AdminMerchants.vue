<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">📦 Liste des Marchands</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <table v-else class="w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3">Entreprise</th>
          <th class="p-3">Email</th>
          <th class="p-3">Devise</th>
          <th class="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in merchants" :key="m.id" class="border-b hover:bg-gray-50">
          <td class="p-3">{{ m.companyName }}</td>
          <td class="p-3">{{ m.contactEmail }}</td>
          <td class="p-3">{{ m.currency }}</td>
          <td class="p-3">
            <span :class="m.isActive ? 'text-green-600' : 'text-red-600'">
              {{ m.isActive ? 'Actif' : 'Inactif' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AdminMerchants",
  data() {
    return {
      merchants: [],
      loading: true,
      error: ""
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:3000/admin/merchants", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Erreur serveur ou accès non autorisé");

      const data = await res.json();
      this.merchants = data.merchants;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
};
</script>
