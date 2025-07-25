<template>
  <div class="flex min-h-screen bg-gray-100 overflow-x-hidden font-satoshi">
    <aside class="w-56 bg-emerald-700 text-white shadow-lg hidden md:flex flex-col justify-between">
      <div>
        <div class="p-6 text-xl font-bold border-b border-emerald-500">Admin</div>
        <nav class="mt-4">
          <ul>
            <li
              v-for="item in menu"
              :key="item.name"
              class="p-4 hover:bg-emerald-600 transition"
            >
              <router-link
                :to="item.path"
                class="block font-medium"
                active-class="underline font-bold"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4 border-t border-emerald-500">
        <button
          @click="logout"
          class="w-full py-2 px-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition"
        >
          Déconnexion
        </button>
      </div>
    </aside>
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  data() {
    return {
      menu: [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Marchands", path: "/admin/merchants" },
        { name: "Transactions", path: "/admin/transactions" }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/admin/login')
    }
  },
};
</script>
