<script setup lang="ts">
import { ArrowRight, ArrowUpRight, AlertTriangle, ArrowLeftRight, BriefcaseBusiness, CircleCheck, Clock3, FileUp, ShieldAlert } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import PageHeading from '../components/PageHeading.vue'
import StatCard from '../components/StatCard.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { demoAlerts, demoCases, demoTransactions } from '../data/demo'

const formatMoney = (cents: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(cents / 100)
</script>

<template>
  <div class="view-stack">
    <PageHeading
      eyebrow="FINANCIAL REVIEW / OVERVIEW"
      title="Good afternoon."
      description="A working view of financial activity, review flags and open investigations."
    >
      <span class="demo-label"><span /> FICTIONAL DEMO DATA</span>
    </PageHeading>

    <section class="welcome-panel">
      <div class="welcome-copy">
        <span class="welcome-kicker">FINANCIAL REVIEW WORKSPACE <i /> OCTOBER 2026</span>
        <h2>See the signal.<br /><em>Investigate the detail.</em></h2>
        <p>Review invoice and payment records, understand unusual patterns and keep every investigation grounded in its source data.</p>
        <div class="welcome-actions">
          <RouterLink to="/alerts" class="button button-primary"><ShieldAlert :size="16" /> Review alerts</RouterLink>
          <RouterLink to="/imports" class="button button-ghost">Import financial data <ArrowRight :size="15" /></RouterLink>
        </div>
      </div>
      <div class="welcome-graphic" aria-hidden="true">
        <div class="graphic-ring ring-one" />
        <div class="graphic-ring ring-two" />
        <div class="graphic-ring ring-three" />
        <span class="graphic-node node-a" />
        <span class="graphic-node node-b" />
        <span class="graphic-node node-c" />
        <div class="graphic-core"><ShieldAlert :size="32" /></div>
        <span class="graphic-caption caption-a">REVIEW</span>
        <span class="graphic-caption caption-b">TRACE</span>
      </div>
      <span class="welcome-reference">FT / OVERVIEW 001</span>
    </section>

    <section class="stats-grid">
      <StatCard label="TRANSACTIONS REVIEWED" value="1,284" note="Illustrative sample period" :icon="ArrowLeftRight" tone="blue" />
      <StatCard label="OPEN REVIEW ALERTS" value="08" note="Requires human review" :icon="AlertTriangle" tone="amber" />
      <StatCard label="OPEN INVESTIGATIONS" value="03" note="Across sample workspace" :icon="BriefcaseBusiness" tone="violet" />
      <StatCard label="CLEARED THIS PERIOD" value="12" note="Illustrative review outcomes" :icon="CircleCheck" tone="mint" />
    </section>

    <div class="content-grid overview-grid">
      <section class="panel activity-panel">
        <div class="panel-heading">
          <div><span class="eyebrow">RECENT FINANCIAL ACTIVITY</span><h3>Latest transactions</h3></div>
          <RouterLink to="/transactions" class="text-link">All transactions <ArrowUpRight :size="14" /></RouterLink>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>REFERENCE</th><th>SUPPLIER</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
            <tbody>
              <tr v-for="transaction in demoTransactions.slice(0, 5)" :key="transaction.id">
                <td><span class="reference-cell">{{ transaction.reference }}</span></td>
                <td><strong class="table-primary">{{ transaction.supplier }}</strong><small class="table-secondary">{{ transaction.invoiceReference }}</small></td>
                <td>{{ new Date(transaction.date).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short' }) }}</td>
                <td class="amount-cell">{{ formatMoney(transaction.amountCents) }}</td>
                <td><StatusBadge :status="transaction.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-footnote"><span class="demo-dot" /> All displayed transactions are fictional demonstration records.</div>
      </section>

      <section class="panel alert-summary-panel">
        <div class="panel-heading">
          <div><span class="eyebrow">NEEDS ATTENTION</span><h3>Review queue</h3></div>
          <span class="queue-count">03 <small>EXAMPLES</small></span>
        </div>
        <div class="alert-compact-list">
          <div v-for="alert in demoAlerts" :key="alert.id" class="alert-compact-row">
            <span class="alert-severity-mark" :class="'severity-' + alert.severity" />
            <div class="alert-compact-copy">
              <strong>{{ alert.title }}</strong>
              <span>{{ alert.id }} <i /> {{ alert.supplier }}</span>
            </div>
            <StatusBadge :status="alert.status.replace('-', ' ')" />
          </div>
        </div>
        <RouterLink to="/alerts" class="panel-bottom-link">Open review queue <ArrowRight :size="14" /></RouterLink>
      </section>
    </div>

    <div class="content-grid bottom-grid">
      <section class="panel case-panel">
        <div class="panel-heading">
          <div><span class="eyebrow">INVESTIGATION WORKSPACE</span><h3>Recent cases</h3></div>
          <RouterLink to="/cases" class="text-link">View cases <ArrowUpRight :size="14" /></RouterLink>
        </div>
        <div class="case-list">
          <div v-for="caseRecord in demoCases.slice(0, 2)" :key="caseRecord.id" class="case-row">
            <div class="case-icon"><BriefcaseBusiness :size="17" /></div>
            <div class="case-copy"><strong>{{ caseRecord.title }}</strong><span>{{ caseRecord.id }} <i /> {{ caseRecord.period }}</span></div>
            <span class="case-alert-count">{{ caseRecord.alertCount }} <small>FLAGS</small></span>
            <StatusBadge :status="caseRecord.status" />
          </div>
        </div>
      </section>

      <section class="panel setup-panel">
        <div class="setup-icon"><FileUp :size="19" /></div>
        <span class="eyebrow">GET STARTED</span>
        <h3>Bring your records into focus.</h3>
        <p>Start with an invoice or payment export. The import workflow is currently a frontend preview only.</p>
        <RouterLink to="/imports" class="button button-outline">Explore data import <ArrowRight :size="15" /></RouterLink>
      </section>
    </div>
    <div class="notice-line"><Clock3 :size="14" /> The analysis engine and database are not connected. All figures, alerts and cases on this screen are sample content.</div>
  </div>
</template>
