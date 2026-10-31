import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import AlertsView from '../views/AlertsView.vue'
import CasesView from '../views/CasesView.vue'
import ImportsView from '../views/ImportsView.vue'
import ReportsView from '../views/ReportsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView, meta: { title: 'Overview' } },
    { path: '/transactions', name: 'transactions', component: TransactionsView, meta: { title: 'Transactions' } },
    { path: '/alerts', name: 'alerts', component: AlertsView, meta: { title: 'Review alerts' } },
    { path: '/cases', name: 'cases', component: CasesView, meta: { title: 'Investigations' } },
    { path: '/imports', name: 'imports', component: ImportsView, meta: { title: 'Data imports' } },
    { path: '/reports', name: 'reports', component: ReportsView, meta: { title: 'Reports' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
