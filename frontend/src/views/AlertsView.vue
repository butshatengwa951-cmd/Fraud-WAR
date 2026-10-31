<script setup lang="ts">
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
  if (!selectedAlert.value) return
  selectedAlert.value.status = status
}
</script>

<template>
  <div class="view-stack">
    <PageHeading eyebrow="EXCEPTIONS / HUMAN REVIEW" title="Review alerts" description="Inspect the rule, supporting records and reason behind each flagged pattern.">
      <span class="demo-label"><span /> EXAMPLE ALERTS</span>
    </PageHeading>

    <div class="info-banner"><Info :size="16" /><p>Flags are investigative leads, not findings of fraud. All alerts on this screen are illustrative and have not been produced by a working detection engine.</p></div>

    <div class="alerts-layout">
      <section class="panel alerts-list-panel">
        <div class="alerts-list-header"><div><span class="eyebrow">REVIEW QUEUE</span><h3>Flagged patterns <b>{{ visibleAlerts.length }}</b></h3></div></div>
        <label class="search-field alert-search"><Search :size="15" /><input v-model="query" type="search" placeholder="Search alerts..." /></label>
        <select v-model="statusFilter" class="select-control full-select" aria-label="Filter alert status">
          <option value="All">All review statuses</option><option value="unreviewed">Unreviewed</option><option value="under-review">Under review</option><option value="cleared">Cleared</option><option value="escalated">Escalated</option>
        </select>

        <button v-for="alert in visibleAlerts" :key="alert.id" type="button" class="alert-list-item" :class="{ selected: selectedId === alert.id }" @click="selectedId = alert.id">
          <span class="alert-list-severity" :class="'severity-' + alert.severity" />
          <span class="alert-list-main"><strong>{{ alert.title }}</strong><small>{{ alert.id }} · {{ alert.supplier }}</small><span class="alert-list-bottom"><StatusBadge :status="alert.status.replace('-', ' ')" /><em>{{ alert.detectedAt }}</em></span></span>
        </button>
        <p v-if="visibleAlerts.length === 0" class="empty-hint">No example alerts match your filters.</p>
      </section>

      <section v-if="selectedAlert" class="panel alert-detail-panel">
        <div class="alert-detail-heading">
          <div><span class="eyebrow">ALERT / {{ selectedAlert.id }}</span><h2>{{ selectedAlert.title }}</h2><p>{{ selectedAlert.supplier }} <i /> Reference {{ selectedAlert.reference }}</p></div>
          <span class="severity-badge" :class="'severity-' + selectedAlert.severity">{{ selectedAlert.severity }} priority</span>
        </div>
        <div class="alert-amount-band"><div><span>RELATED AMOUNT</span><strong>{{ new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(selectedAlert.amountCents / 100) }}</strong></div><span>DETECTED {{ selectedAlert.detectedAt.toUpperCase() }}</span></div>

        <div class="detail-block"><span class="eyebrow">DETECTION RULE</span><strong class="rule-code">{{ selectedAlert.rule }}</strong><p>{{ selectedAlert.explanation }}</p></div>
        <div class="detail-block"><span class="eyebrow">MATCHED FIELDS</span><div class="matched-fields"><span v-for="field in selectedAlert.matchedFields" :key="field"><Check :size="13" /> {{ field }}</span></div></div>
        <div class="detail-block"><span class="eyebrow">REVIEW STATUS</span><div class="review-actions">
          <button type="button" class="review-button" :class="{ active: selectedAlert.status === 'under-review' }" @click="setStatus('under-review')">Under review</button>
          <button type="button" class="review-button" :class="{ active: selectedAlert.status === 'cleared' }" @click="setStatus('cleared')">Clear / explain</button>
          <button type="button" class="review-button" :class="{ active: selectedAlert.status === 'escalated' }" @click="setStatus('escalated')">Escalate</button>
        </div><p class="local-note">Status changes are temporary and remain in this browser session only.</p></div>
        <div class="alert-disclaimer"><AlertTriangle :size="15" /><span>This match may have a legitimate explanation. Verify the original invoice, payment records, reversals and supporting documentation before drawing conclusions.</span></div>
      </section>
      <section v-else class="panel alert-detail-empty"><AlertTriangle :size="24" /><strong>Select an alert to inspect</strong><span>Choose a record from the review queue.</span></section>
    </div>
  </div>
</template>
