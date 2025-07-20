import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminLogin from '../views/AdminLoginView.vue'
import RegisterMerchantView from '@/views/RegisterMerchantView.vue'
import ActivationSuccessView from '@/views/ActivationSuccessView.vue'
import CreateTransaction from '../views/CreateTransaction.vue'
import PaymentView from '@/views/PaymentView.vue'
import TransactionDetailsView from '@/views/TransactionDetailsView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'

const routes = [
  { path: '/', redirect: '/choose' },
  { path: '/login', component: LoginView },
  { path: '/activation-success', component: ActivationSuccessView },
  { path: '/dashboard', component: DashboardView },
  { path: '/register', component: RegisterMerchantView },
  { path: '/admin/dashboard', component: AdminDashboardView },
  {
    path: '/dashboard/create-transaction',
    component: CreateTransaction,
    meta: { requiresAuth: true },
  },
  {
    path: '/choose',
    name: 'ChooseLogin',
    component: () => import('../views/ChooseLoginView.vue'),
  },
  {
    path: '/payment/:id',
    component: PaymentView,
    name: 'PaymentView',
  },
  {
    path: '/dashboard/transactions/:id',
    component: TransactionDetailsView,
    name: 'TransactionDetailsView',
  },
  // {
  //   path: '/admin',
  //   component: AdminLayout,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'AdminDashboard',
  //       component: () => import('@/views/admin/AdminDashboard.vue'),
  //     },
  //     {
  //       path: 'merchants',
  //       name: 'AdminMerchants',
  //       component: () => import('@/views/admin/AdminMerchants.vue'),
  //     },
  //     {
  //       path: 'transactions',
  //       name: 'AdminTransactions',
  //       component: () => import('@/views/admin/AdminTransactions.vue'),
  //     },
  //   ],
  // },
  { path: '/admin/login', component: AdminLogin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
