<script setup lang="ts">
import { computed, ref } from 'vue'
import { FileSpreadsheet, FileUp, Info, ShieldCheck, X } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'

const selectedFile = ref<File | null>(null)
const input = ref<HTMLInputElement | null>(null)
const fileKind = ref<'Invoices' | 'Payments'>('Invoices')
const error = ref('')

const sizeLabel = computed(() => {
  if (!selectedFile.value) return ''
  const bytes = selectedFile.value.size
  return bytes < 1024 * 1024 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / (1024 * 1024)).toFixed(2) + ' MB'
})

function chooseFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!file.name.toLowerCase().endsWith('.csv')) {
    error.value = 'This foundation accepts a CSV selection for preview. No file is uploaded or processed.'
    return
  }
  selectedFile.value = file
  error.value = ''
}

function resetFile() {
  selectedFile.value = null
  error.value = ''
  if (input.value) input.value.value = ''
}
</script>

<template>
  <div class="view-stack">
    <PageHeading eyebrow="DATA INGESTION / SOURCE RECORDS" title="Data imports" description="Bring invoice and payment exports into a structured review workflow.">
      <span class="status-label-pending">IMPORT ENGINE NOT CONNECTED</span>
    </PageHeading>

    <div class="info-banner"><Info :size="16" /><p>File selection is a frontend-only preview. No CSV parsing, upload, validation or database storage has been implemented. Use synthetic data during development.</p></div>

    <div class="content-grid import-grid">
      <section class="panel import-panel">
        <div class="panel-heading"><div><span class="eyebrow">SOURCE FILE</span><h3>Select a financial export</h3></div><span class="panel-index">IMPORT / 01</span></div>
        <div class="import-kind">
          <button type="button" :class="{ active: fileKind === 'Invoices' }" @click="fileKind = 'Invoices'"><FileSpreadsheet :size="16" /> Invoice records</button>
          <button type="button" :class="{ active: fileKind === 'Payments' }" @click="fileKind = 'Payments'"><FileUp :size="16" /> Payment records</button>
        </div>
        <input ref="input" type="file" accept=".csv,text/csv" class="visually-hidden" @change="chooseFile" />
        <div v-if="!selectedFile" class="drop-zone" @click="input?.click()">
          <div class="drop-zone-icon"><FileUp :size="24" /></div>
          <strong>Choose a CSV file</strong>
          <span>Browse for a {{ fileKind.toLowerCase() }} export on your device.</span>
          <button type="button" class="button button-outline" @click.stop="input?.click()">Browse files</button>
          <small>CSV format · File is not transmitted</small>
        </div>
        <div v-else class="selected-import">
          <div class="selected-file-icon"><FileSpreadsheet :size="21" /></div>
          <div class="selected-file-copy"><strong>{{ selectedFile.name }}</strong><span>{{ sizeLabel }} · {{ fileKind }}</span></div>
          <button type="button" class="icon-button" aria-label="Remove file" @click="resetFile"><X :size="17" /></button>
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <div class="import-action-row">
          <span>Next step: column mapping & validation</span>
          <button type="button" class="button button-primary" disabled>Continue to mapping</button>
        </div>
      </section>

      <section class="panel schema-panel">
        <div class="panel-heading"><div><span class="eyebrow">EXPECTED FIELDS</span><h3>{{ fileKind }} CSV structure</h3></div><ShieldCheck :size="18" class="muted-icon" /></div>
        <p class="schema-description">The eventual importer will let users map source columns to these standard fields.</p>
        <div v-if="fileKind === 'Invoices'" class="schema-list">
          <div v-for="field in ['supplier_name', 'supplier_id', 'invoice_number', 'invoice_date', 'invoice_amount', 'currency', 'purchase_order_reference']" :key="field"><code>{{ field }}</code><span>{{ field === 'purchase_order_reference' ? 'Optional' : 'Expected' }}</span></div>
        </div>
        <div v-else class="schema-list">
          <div v-for="field in ['payment_reference', 'supplier_name', 'supplier_id', 'invoice_reference', 'payment_date', 'payment_amount', 'currency', 'ledger_reference']" :key="field"><code>{{ field }}</code><span>{{ field === 'ledger_reference' ? 'Optional' : 'Expected' }}</span></div>
        </div>
        <div class="schema-footnote">Money values will be normalised into integer minor units after a currency and decimal format have been confirmed.</div>
      </section>
    </div>

    <section class="panel import-steps">
      <div class="panel-heading"><div><span class="eyebrow">PLANNED WORKFLOW</span><h3>From source file to review-ready records</h3></div></div>
      <div class="step-track">
        <div class="step-item current"><span>01</span><strong>Select file</strong><small>Choose source CSV</small></div>
        <div class="step-connector" />
        <div class="step-item"><span>02</span><strong>Map columns</strong><small>Match source fields</small></div>
        <div class="step-connector" />
        <div class="step-item"><span>03</span><strong>Validate rows</strong><small>Review rejected data</small></div>
        <div class="step-connector" />
        <div class="step-item"><span>04</span><strong>Import records</strong><small>Store case data</small></div>
      </div>
    </section>
  </div>
</template>
