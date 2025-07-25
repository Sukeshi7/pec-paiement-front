import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue')
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/RegisterView.vue')
		},
		{
			path: '/merchant/dashboard',
			name: 'merchant-dashboard',
			component: () => import('@/views/merchant/DashboardView.vue'),
		},
		{
			path: '/merchant/profile',
			name: 'merchant-profile',
			component: () => import('@/views/merchant/ProfileView.vue'),
		},
		{
			path: '/merchant/transactions',
			name: 'merchant-transactions',
			component: () => import('@/views/merchant/TransactionsView.vue'),
		},
		{
			path: '/merchant/refunds',
			name: 'merchant-refunds',
			component: () => import('@/views/merchant/RefundsView.vue'),
		},
	],
})

export default router
