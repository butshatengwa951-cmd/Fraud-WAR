<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, Plus, Search } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const title = computed(() => String(route.meta.title ?? 'Workspace'))
</script>

<template>
  <header class="topbar">
    <div class="breadcrumbs">
      <span>FINTRACE</span><i>/</i><strong>{{ title }}</strong>
    </div>
    <div class="topbar-actions">
      <div class="environment-pill"><span /> DEMONSTRATION ENVIRONMENT</div>
      <button type="button" class="icon-button" aria-label="Search not available" disabled><Search :size="17" /></button>
      <button type="button" class="icon-button" aria-label="Notifications not available" disabled><Bell :size="17" /></button>
      <button type="button" class="button button-primary button-small" @click="router.push('/cases')">
        <Plus :size="16" /> New case
      </button>
    </div>
  </header>
</template>
