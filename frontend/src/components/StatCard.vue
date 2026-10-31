<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  label: string
  value: string
  note: string
  icon: Component
  tone?: 'mint' | 'amber' | 'violet' | 'blue'
}>()
</script>

<template>
  <article class="stat-card">
    <div class="stat-card-heading">
      <span>{{ label }}</span>
      <span class="stat-icon" :class="'tone-' + (tone ?? 'mint')"><component :is="icon" :size="17" /></span>
    </div>
    <strong>{{ value }}</strong>
    <p>{{ note }}</p>
  </article>
</template>
