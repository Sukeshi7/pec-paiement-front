<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Dashboard Admin</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold">Nombre de marchands</h2>
          <p class="text-2xl mt-2">{{ stats.merchants }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold">Transactions</h2>
          <p class="text-2xl mt-2">{{ stats.transactions }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold">Montant total (€)</h2>
          <p class="text-2xl mt-2">{{ stats.totalAmount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      stats: {
        merchants: 0,
        transactions: 0,
        totalAmount: 0
      }
    };
  },
  async mounted() {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      this.$router.push("/admin/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      this.stats = {
        merchants: data.merchants || 5,
        transactions: data.transactions || 12,
        totalAmount: data.totalAmount || 1550
      };
    } catch (err) {
      console.error("Erreur lors du chargement du dashboard", err);
    }
  }
};
</script>
