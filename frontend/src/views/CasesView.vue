<script setup lang="ts">
import { computed, ref } from 'vue'
import { BriefcaseBusiness, Plus, Search, X } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { demoCases } from '../data/demo'
import type { CaseRecord } from '../types'

const cases = ref<CaseRecord[]>(demoCases.map((record) => ({ ...record })))
const query = ref('')
const showForm = ref(false)
const title = ref('')
const period = ref('')
const description = ref('')
const validation = ref('')

const filteredCases = computed(() => cases.value.filter((record) =>
  [record.id, record.title, record.owner].some((value) => value.toLowerCase().includes(query.value.trim().toLowerCase())),
))

function createCase() {
  if (!title.value.trim() || !period.value.trim()) {
    validation.value = 'Enter a case title and review period.'
    return
  }
  cases.value.unshift({
    id: 'FT-2026-' + String(cases.value.length + 15).padStart(3, '0'),
    title: title.value.trim(),
    period: period.value.trim(),
    owner: 'Local workspace',
    opened: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
    alertCount: 0,
    status: 'Open',
  })
  title.value = ''
  period.value = ''
  description.value = ''
  validation.value = ''
  showForm.value = false
}
</script>

<template>
  <div class="view-stack">
    <PageHeading eyebrow="CASE MANAGEMENT / REVIEW WORKSPACE" title="Investigations" description="Group related financial records and review activity into a defined case.">
      <button class="button button-primary" type="button" @click="showForm = true"><Plus :size="16" /> New case</button>
    </PageHeading>

    <div class="info-banner"><BriefcaseBusiness :size="16" /><p>Cases created here are held in local Vue state for this demonstration. They are not saved to a database.</p></div>

    <section v-if="showForm" class="panel case-create-panel">
      <div class="panel-heading"><div><span class="eyebrow">CASE SETUP</span><h3>Create review case</h3></div><button class="icon-button" type="button" aria-label="Close case form" @click="showForm = false"><X :size="17" /></button></div>
      <form class="case-form" @submit.prevent="createCase">
        <label class="form-field"><span>Case title</span><input v-model="title" class="text-input" placeholder="e.g. Supplier payment review" maxlength="100" /></label>
        <label class="form-field"><span>Review period</span><input v-model="period" class="text-input" placeholder="e.g. 01–31 October 2026" maxlength="80" /></label>
        <label class="form-field form-field-wide"><span>Description (optional)</span><input v-model="description" class="text-input" placeholder="Short purpose of this review" maxlength="200" /></label>
        <p v-if="validation" class="form-error">{{ validation }}</p>
        <button class="button button-primary" type="submit">Create local case</button>
      </form>
    </section>

    <section class="panel cases-panel">
      <div class="list-toolbar">
        <div><span class="eyebrow">CASE REGISTER</span><h3>All investigations <small>{{ filteredCases.length }} records</small></h3></div>
        <label class="search-field"><Search :size="15" /><input v-model="query" type="search" placeholder="Search cases..." /></label>
      </div>
      <div class="table-wrap">
        <table class="data-table cases-table">
          <thead><tr><th>CASE REFERENCE / TITLE</th><th>REVIEW PERIOD</th><th>OWNER</th><th>ALERTS</th><th>OPENED</th><th>STATUS</th></tr></thead>
          <tbody>
            <tr v-for="item in filteredCases" :key="item.id">
              <td><span class="reference-cell">{{ item.id }}</span><strong class="table-primary case-title">{{ item.title }}</strong></td>
              <td>{{ item.period }}</td><td>{{ item.owner }}</td><td><span class="case-alert-number">{{ item.alertCount }}</span></td><td>{{ item.opened }}</td><td><StatusBadge :status="item.status" /></td>
            </tr>
            <tr v-if="filteredCases.length === 0"><td colspan="6" class="empty-row">No cases match your search.</td></tr>
          </tbody>
        </table>
      </div>
      <div class="table-footnote">Case register includes fictional sample records. Changes made here are not persisted.</div>
    </section>
  </div>
</template>
