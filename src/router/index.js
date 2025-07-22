import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminLogin from '../views/AdminLoginView.vue'
import RegisterMerchantView from '@/views/RegisterMerchantView.vue'
import ActivationSuccessView from '@/views/ActivationSuccessView.vue'
import CreateTransaction from '../views/CreateTransaction.vue'
import PaymentView from '@/views/PaymentView.vue'
import TransactionDetailsView from '@/views/TransactionDetailsView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import PspPaymentView from '@/views/PspPaymentView.vue'
import CredentialsView from '../views/siteTest/CredentialsView.vue'
import CartView from '../views/siteTest/CartView.vue'
import TransactionsView from '../views/siteTest/TransactionsView.vue'
import PaymentViewSite from '@/views/siteTest/PaymentView.vue'
import ProductView from '@/views/siteTest/ProductView.vue'
import CheckoutView from '@/views/siteTest/CheckoutView.vue'
const routes = [
  { path: '/', redirect: '/choose' },
  { path: '/login', component: LoginView },
  { path: '/activation-success', component: ActivationSuccessView },
  { path: '/dashboard', component: DashboardView },
  { path: '/psp/payment', component: PspPaymentView },
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
  {
    path: '/test/credentials',
    component: CredentialsView,
    name: 'TestCredentials',
  },
  {
    path: '/test/cart',
    component : CartView,
    name: 'CartView',
  },
  {
    path: '/test/transactions',
    component : TransactionsView,
    name: 'TransactionsView',
  },
 {
    path: '/siteTest/payment/:id',
    name: 'PaymentViewSite',
    component: PaymentViewSite
  },
  {
    path: '/test/product',
    name: 'ProductView',
    component: ProductView
  },
   {
    path: '/test/checkout',
    name: 'CheckoutView',
    component: CheckoutView
  },
  { path: '/admin/login', component: AdminLogin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
