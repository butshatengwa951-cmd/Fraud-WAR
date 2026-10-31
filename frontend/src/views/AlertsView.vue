import { computed, ref } from 'vue'
import { AlertTriangle, Check, Info, Search } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { demoAlerts } from '../data/demo'
import type { Alert, ReviewStatus } from '../types'

const alerts = ref<Alert[]>(demoAlerts.map((alert) => ({ ...alert, matchedFields: [...alert.matchedFields] })))
const query = ref('')
const statusFilter = ref('All')
const selectedId = ref(alerts.value[0]?.id ?? '')
const selectedAlert = computed(() => alerts.value.find((alert) => alert.id === selectedId.value))
const visibleAlerts = computed(() => alerts.value.filter((alert) => {
  const q = query.value.trim().toLowerCase()
  const matchesText = !q || [alert.id, alert.title, alert.supplier, alert.reference].some((value) => value.toLowerCase().includes(q))
  const matchesStatus = statusFilter.value === 'All' || alert.status === statusFilter.value
  return matchesText && matchesStatus
}))

function setStatus(status: ReviewStatus) {
  const current = selectedAlert.value
  if (!current) return
  current.status = status
}
