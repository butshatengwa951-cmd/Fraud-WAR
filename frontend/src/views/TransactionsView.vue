<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDownUp, Download, Search, SlidersHorizontal } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { demoTransactions } from '../data/demo'

const query = ref('')
const typeFilter = ref('All')
const statusFilter = ref('All')
const formatMoney = (cents: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(cents / 100)

const filteredTransactions = computed(() => demoTransactions.filter((item) => {
  const q = query.value.trim().toLowerCase()
  const matchesQuery = !q || [item.id, item.supplier, item.reference, item.invoiceReference].some((value) => value.toLowerCase().includes(q))
  const matchesType = typeFilter.value === 'All' || item.type === typeFilter.value
  const matchesStatus = statusFilter.value === 'All' || item.status === statusFilter.value
  return matchesQuery && matchesType && matchesStatus
}))
</script>

<template>
  <div class="view-stack">
    <PageHeading eyebrow="FINANCIAL RECORDS / LEDGER VIEW" title="Transactions" description="Explore imported invoice and payment records in one searchable workspace.">
      <span class="demo-label"><span /> SAMPLE RECORDS</span>
    </PageHeading>

    <section class="panel transaction-panel">
      <div class="toolbar">
        <label class="search-field">
          <Search :size="16" />
          <input v-model="query" type="search" placeholder="Search supplier, reference or ID..." />
        </label>
        <div class="toolbar-filters">
          <label class="select-filter"><SlidersHorizontal :size="14" /><select v-model="typeFilter" aria-label="Filter transaction type"><option>All</option><option>Invoice</option><option>Payment</option></select></label>
          <select v-model="statusFilter" class="select-control" aria-label="Filter status"><option>All</option><option>Matched</option><option>Pending</option><option>Flagged</option></select>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table transaction-table">
          <thead><tr><th><ArrowDownUp :size="12" /> TRANSACTION ID</th><th>SUPPLIER</th><th>DOCUMENT REF.</th><th>DATE</th><th>TYPE</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
          <tbody>
            <tr v-for="item in filteredTransactions" :key="item.id">
              <td><span class="reference-cell">{{ item.id }}</span></td>
              <td><strong class="table-primary">{{ item.supplier }}</strong><small class="table-secondary">{{ item.invoiceReference }}</small></td>
              <td>{{ item.reference }}</td>
              <td>{{ new Date(item.date).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }) }}</td>
              <td><span class="type-label" :class="item.type.toLowerCase()">{{ item.type }}</span></td>
              <td class="amount-cell">{{ formatMoney(item.amountCents) }}</td>
              <td><StatusBadge :status="item.status" /></td>
            </tr>
            <tr v-if="filteredTransactions.length === 0"><td colspan="7" class="empty-row">No sample records match those filters.</td></tr>
          </tbody>
        </table>
      </div>
      <div class="table-pagination"><span>Showing {{ filteredTransactions.length }} of {{ demoTransactions.length }} demonstration records</span><button class="button button-outline button-small" type="button" disabled><Download :size="14" /> Export will be added later</button></div>
    </section>
    <div class="notice-line">Transaction data is fictional sample content. Search and filters operate locally in this frontend only.</div>
  </div>
</template>
