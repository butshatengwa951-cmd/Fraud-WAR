<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  Activity,
  AlertTriangle,
  ArrowLeftRight,
  BriefcaseBusiness,
  FileChartColumn,
  FileUp,
  ShieldCheck,
} from 'lucide-vue-next'

interface NavItem {
  label: string
  to: string
  icon: Component
}

const route = useRoute()
const navigation: NavItem[] = [
  { label: 'Overview', to: '/', icon: Activity },
  { label: 'Transactions', to: '/transactions', icon: ArrowLeftRight },
  { label: 'Review alerts', to: '/alerts', icon: AlertTriangle },
  { label: 'Investigations', to: '/cases', icon: BriefcaseBusiness },
  { label: 'Data imports', to: '/imports', icon: FileUp },
  { label: 'Reports', to: '/reports', icon: FileChartColumn },
]
const activePath = computed(() => route.path)
</script>

<template>
  <aside class="sidebar">
    <RouterLink to="/" class="brand-lockup" aria-label="FINTRACE overview">
      <span class="brand-symbol"><ShieldCheck :size="22" :stroke-width="1.8" /></span>
      <span class="brand-text">
        <strong>FINTRACE</strong>
        <small>FINANCIAL INTELLIGENCE</small>
      </span>
    </RouterLink>

    <div class="workspace-label">WORKSPACE</div>
    <div class="workspace-card">
      <span class="workspace-avatar">FR</span>
      <span class="workspace-meta">
        <strong>Finance review</strong>
        <small>Local workspace</small>
      </span>
      <span class="online-dot" />
    </div>

    <nav class="primary-nav" aria-label="Main navigation">
      <span class="nav-section-label">ANALYSIS</span>
      <RouterLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        :class="{ active: activePath === item.to }"
      >
        <component :is="item.icon" :size="18" :stroke-width="1.8" />
        <span>{{ item.label }}</span>
        <span v-if="activePath === item.to" class="active-rail" />
      </RouterLink>
    </nav>

    <div class="sidebar-bottom">
      <div class="backend-card">
        <div class="backend-card-title"><span class="backend-dot" /> ENGINE STATUS</div>
        <strong>Not connected</strong>
        <p>The C++ analysis backend is planned for a later development phase.</p>
      </div>
      <a href="https://github.com/butshatengwa951-cmd/Fraud-WAR" target="_blank" rel="noreferrer" class="repo-link">
        <ShieldCheck :size="16" /> Project repository
      </a>
      <div class="sidebar-foot">
        <span>FINTRACE FOUNDATION</span>
        <span>V0.1.0</span>
      </div>
    </div>
  </aside>
</template>
