<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const auth = useAuthStore()

const handleLogin = async () => {
	if (isLoading.value) return

	isLoading.value = true

	await auth.login({
		email: email.value,
		password: password.value,
	})

	isLoading.value = false
}
</script>

<template>
	<div class="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-md font-satoshi">
		<h1 class="text-3xl font-bold text-emerald-700 mb-6 text-center">Connexion à PecPay</h1>
		<form @submit.prevent="handleLogin" class="space-y-5">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					v-model="email"
					type="email"
					id="email"
					name="email"
					required
					class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
				<input
					v-model="password"
					type="password"
					id="password"
					name="password"
					required
					class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
				/>
			</div>
			<button
				:disabled="isLoading"
				type="submit"
				class="w-full bg-emerald-700 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition font-semibold"
			>
				{{ isLoading ? 'Connexion...' : 'Se connecter' }}
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-gray-600">
			Pas encore de compte ?
			<RouterLink to="/register" class="text-emerald-700 hover:underline font-medium">
				Créer un compte
			</RouterLink>
		</p>
	</div>
</template>
