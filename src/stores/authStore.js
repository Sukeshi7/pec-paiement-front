// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
	const token = ref(null)
	const user = ref(null)

	const router = useRouter()

	const login = async (credentials) => {
		try {
			// const response = await fetch('https://api.pecpay.com/login', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(credentials)
			// })

			// if (!response.ok) throw new Error('Identifiants invalides')

			// const data = await response.json()
			// token.value = data.token
			// user.value = data.user

			// simulation
			token.value = 'fake-token-abc123'
			user.value = {
				email: credentials.email,
				role: 'merchant',
			}

			if (user.value.role === 'admin') {
				router.push('/admin/dashboard')
			}
			router.push('/merchant/dashboard')
		} catch (error) {
			console.error('Login failed:', error)
			alert('Erreur de connexion.')
		}
	}

	const logout = () => {
		token.value = null
		user.value = null
		localStorage.removeItem('token')
		router.push('/login')
	}

	const isAuthenticated = () => !!token.value

	return { token, user, login, logout, isAuthenticated }
})
