<script setup>
import { ref, reactive } from 'vue'

const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const businessName = ref('')
const isLoading = ref(false)

const errors = reactive({
	username: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: '',
	businessName: ''
})

const validateFields = () => {
	let isValid = true

	// Reset errors
	for (const key in errors) {
		errors[key] = ''
	}

	if (!username.value.trim()) {
		errors.username = 'Le nom complet est requis.'
		isValid = false
	}

	if (!email.value.trim() || !email.value.includes('@')) {
		errors.email = "L'adresse email est invalide."
		isValid = false
	}

	if (!phone.value.trim()) {
		errors.phone = 'Le numéro de téléphone est requis.'
		isValid = false
	}

	if (!password.value.trim()) {
		errors.password = 'Le mot de passe est requis.'
		isValid = false
	}

	if (password.value !== confirmPassword.value) {
		errors.confirmPassword = 'Les mots de passe ne correspondent pas.'
		isValid = false
	}

	if (!businessName.value.trim()) {
		errors.businessName = 'La dénomination sociale est requise.'
		isValid = false
	}

	return isValid
}

const submitForm = async () => {
	if (isLoading.value) return
	if (!validateFields()) return

	const payload = {
		name: username.value,
		email: email.value,
		phone: phone.value,
		password: password.value,
		business_name: businessName.value
	}

	isLoading.value = true

	try {
		console.log('Payload envoyé :', payload)

		// const response = await fetch('https://api.pecpay.com/register', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(payload),
		// })

		// if (!response.ok) {
		//   const error = await response.json()
		//   alert(error.message || 'Une erreur est survenue.')
		//   return
		// }

		// const result = await response.json()
		// console.log(result)

		alert('Inscription simulée avec succès !')
		// router.push('/login')
	} catch (error) {
		console.error('Erreur lors de l’inscription :', error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<section class="bg-gray-50 py-16 font-satoshi">
		<div class="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-md">
			<h2 class="text-3xl font-bold text-emerald-700 mb-8 text-center">Inscription à PecPay</h2>

			<form @submit.prevent="submitForm" class="space-y-8">
				<div class="relative grid grid-cols-1 md:grid-cols-2 gap-8">
					<!-- Colonne gauche -->
					<div class="space-y-5">
						<div>
							<label for="username" class="block text-sm font-medium text-gray-700">Nom complet</label>
							<input
								id="username"
								v-model="username"
								type="text"
								required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
							/>
							<p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
							<input
								id="email"
								v-model="email"
								type="email"
								required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
							/>
							<p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
						</div>

						<div>
							<label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
							<input
								id="phone"
								v-model="phone"
								type="tel"
								required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
							/>
							<p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
						</div>
					</div>

					<!-- Séparateur -->
					<div class="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200"></div>

					<!-- Colonne droite -->
					<div class="space-y-5">
						<div>
							<label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
							<input
								id="password"
								v-model="password"
								type="password"
								required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
							/>
							<p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
						</div>

						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
							<input
								id="confirmPassword"
								v-model="confirmPassword"
								type="password"
								required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
							/>
							<p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
						</div>

						<div>
							<label for="businessName" class="block text-sm font-medium text-gray-700">Dénomination Sociale</label>
							<input
								id="businessName"
								v-model="businessName"
								type="text"
								required
								class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
							/>
							<p v-if="errors.businessName" class="text-red-500 text-sm mt-1">{{ errors.businessName }}</p>
						</div>
					</div>
				</div>

				<!-- Bouton -->
				<div>
					<button
						type="submit"
						:disabled="isLoading"
						class="w-full bg-emerald-700 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition font-semibold"
					>
						{{ isLoading ? "Inscription..." : "S'inscrire" }}
					</button>
				</div>
			</form>

			<p class="mt-6 text-center text-sm text-gray-600">
				Déjà inscrit ?
				<RouterLink to="/login" class="text-emerald-700 hover:underline font-medium">Se connecter</RouterLink>
			</p>
		</div>
	</section>
</template>
