import { ArrowRight, ArrowUpRight, AlertTriangle, ArrowLeftRight, BriefcaseBusiness, CircleCheck, Clock3, FileUp, ShieldAlert } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import PageHeading from '../components/PageHeading.vue'
import StatCard from '../components/StatCard.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { demoAlerts, demoCases, demoTransactions } from '../data/demo'

const formatMoney = (cents: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(cents / 100)
