<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { computed, ref } from "vue";
const auth = useAuthStore()

const isLoggedIn = computed(() => !!auth.user && !!auth.user.role)
const isAdmin = computed(() => auth.user?.role === 'admin')


const showMobileMenu = ref(false)
const toggleMenu = () => {
	showMobileMenu.value = !showMobileMenu.value
}
</script>

<template>
	<header class="bg-emerald-700 text-white shadow-md font-satoshi">
		<div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
			<RouterLink to="/" class="text-2xl font-bold tracking-wide">
				PecPay
			</RouterLink>

			<!-- Desktop navigation -->
			<nav class="space-x-6 hidden md:flex">
				<template v-if="isLoggedIn">
					<template v-if="isAdmin">
						<RouterLink to="/admin" class="hover:underline text-yellow-200">Admin</RouterLink>
					</template>

					<template v-else>
						<RouterLink to="/merchant/dashboard" class="hover:underline">Dashboard</RouterLink>
						<RouterLink to="/merchant/transactions" class="hover:underline">Transactions</RouterLink>
						<RouterLink to="/merchant/refunds" class="hover:underline">Remboursements</RouterLink>
						<RouterLink to="/merchant/profile" class="hover:underline">Profil</RouterLink>
					</template>

					<button @click="auth.logout()" class="hover:underline text-red-300">Déconnexion</button>
				</template>

				<template v-else>
					<RouterLink to="/login" class="hover:underline">Connexion</RouterLink>
					<RouterLink to="/register" class="hover:underline">Inscription</RouterLink>
				</template>


			</nav>

			<!-- Mobile toggle -->
			<button class="md:hidden" @click="toggleMenu">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
					 viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						  d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>

		<!-- Mobile nav -->
		<div v-if="showMobileMenu" class="md:hidden px-6 pb-4 space-y-2">
			<template v-if="isLoggedIn">
				<RouterLink to="/merchant/dashboard" class="block hover:underline">Dashboard</RouterLink>
				<RouterLink to="/merchant/transactions" class="block hover:underline">Transactions</RouterLink>
				<RouterLink to="/merchant/refunds" class="block hover:underline">Remboursements</RouterLink>
				<RouterLink to="/merchant/profile" class="block hover:underline">Profil</RouterLink>
				<RouterLink to="/" class="block text-red-300 hover:underline">Déconnexion</RouterLink>
			</template>

			<template v-else>
				<RouterLink to="/login" class="block hover:underline">Connexion</RouterLink>
				<RouterLink to="/register" class="block hover:underline">Inscription</RouterLink>
			</template>

			<template v-if="isAdmin">
				<RouterLink to="/admin" class="block text-yellow-200 hover:underline">Admin</RouterLink>
			</template>
		</div>
	</header>
</template>
