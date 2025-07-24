<script>
import SiteTestNavbarView from '@/components/SiteTestNavbarView.vue';
const apiUrl = import.meta.env.VITE_API_URL
export default {
    name: "AdminLogin",
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    },
    
    methods: {
        async handleLogin() {
            try {
                const res = await fetch(`${apiUrl}/admin/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    this.error = data.error || "Erreur lors de la connexion.";
                    return;
                }

                localStorage.setItem("admin_token", data.token);
                this.$router.push("/admin/dashboard");
            } catch (err) {
                this.error = "Erreur serveur.";
            }
        }
    },
    mounted() {
        const token = localStorage.getItem("admin_token");
        if (token) {
            this.$router.push("/admin/dashboard");
        }
    }
};
</script>
<template>
    <SiteTestNavbarView/>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Connexion Admin</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input v-model="email" type="email" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Mot de passe</label>
                    <input v-model="password" type="password" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400" />
                </div>
                <button type="submit" class="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition">
                    Se connecter
                </button>
                <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
            </form>
        </div>
    </div>
</template>
