<script setup lang="ts">
import { Download, FileChartColumn, FileText, Info, ShieldCheck } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
</script>

<template>
  <div class="view-stack">
    <PageHeading eyebrow="CASE OUTPUT / DOCUMENTATION" title="Reports" description="Prepare clear, traceable summaries of transaction reviews and investigation activity.">
      <span class="status-label-pending">REPORT GENERATION PLANNED</span>
    </PageHeading>

    <section class="report-hero panel">
      <div class="report-hero-icon"><FileChartColumn :size="25" /></div>
      <span class="eyebrow">REPORTING WORKSPACE</span>
      <h2>Evidence-led reporting.</h2>
      <p>FINTRACE will produce review summaries that link every flagged pattern to the records, rule and reviewer decision behind it.</p>
    </section>

    <div class="report-template-grid">
      <article class="panel report-template"><div class="report-template-icon"><FileText :size="19" /></div><span class="eyebrow">TEMPLATE 01</span><h3>Case summary</h3><p>Case scope, imported records, review progress and final disposition summary.</p><span class="template-status">PLANNED</span></article>
      <article class="panel report-template"><div class="report-template-icon report-icon-amber"><ShieldCheck :size="19" /></div><span class="eyebrow">TEMPLATE 02</span><h3>Alert register</h3><p>Flagged records, rule explanations, supporting references and review outcomes.</p><span class="template-status">PLANNED</span></article>
      <article class="panel report-template"><div class="report-template-icon report-icon-blue"><Download :size="19" /></div><span class="eyebrow">TEMPLATE 03</span><h3>Data validation log</h3><p>Imported source files, accepted rows, rejected rows and validation reasons.</p><span class="template-status">PLANNED</span></article>
    </div>

    <div class="info-banner"><Info :size="16" /><p>There are no real reports to generate yet. CSV export and formatted report generation will be implemented after the C++ processing and data layers are connected.</p></div>
  </div>
</template>
