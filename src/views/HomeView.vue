<script setup>
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
	<AppHeader />
	<section class="bg-gray-50 py-20 font-satoshi">
		<div class="max-w-6xl mx-auto px-6 text-center">
			<h1 class="text-4xl md:text-5xl font-bold text-emerald-700 mb-6">
				PecPay, la solution de paiement des professionnels
			</h1>
			<p class="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
				Encaissez simplement, gérez vos transactions, remboursements et clients en toute sécurité.
				PecPay est conçu pour les e-commerçants qui veulent une solution rapide, fiable et sans complexité.
			</p>

			<div class="flex justify-center gap-4 mb-16">
				<RouterLink
					to="/register"
					class="bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-600 transition"
				>
					Créer un compte
				</RouterLink>
				<RouterLink
					to="/login"
					class="border border-emerald-700 text-emerald-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50 transition"
				>
					Se connecter
				</RouterLink>
			</div>

			<!-- 3 arguments commerciaux -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
				<div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
					<h3 class="text-xl font-semibold text-emerald-700 mb-2">Paiement simplifié</h3>
					<p class="text-sm text-gray-700">
						Intégrez PecPay en quelques clics, sans setup compliqué ni abonnement. Encaissez rapidement sur toutes vos plateformes.
					</p>
				</div>
				<div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
					<h3 class="text-xl font-semibold text-emerald-700 mb-2">Interface marchande intuitive</h3>
					<p class="text-sm text-gray-700">
						Gérez vos transactions, remboursements et clients depuis une interface claire, rapide et conçue pour les marchands.
					</p>
				</div>
				<div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
					<h3 class="text-xl font-semibold text-emerald-700 mb-2">Sécurité & transparence</h3>
					<p class="text-sm text-gray-700">
						Chiffrement des données, système anti-fraude intégré, et tableau de bord en temps réel. Vos finances sont entre de bonnes mains.
					</p>
				</div>
			</div>

			<!-- Footer temporaire -->
			<p class="text-gray-500 mt-20 text-sm">
				&copy; 2025 PecPay. Tous droits réservés.
			</p>
		</div>
	</section>
</template>
