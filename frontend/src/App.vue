<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <div class="workspace">
      <Topbar />
      <main class="page-content">
        <RouterView />
      </main>
      <footer class="app-footer">
        <span>FINTRACE <i>/</i> FINANCIAL REVIEW WORKSPACE</span>
        <span>DEMO DATA · NO LIVE DETECTION ENGINE CONNECTED</span>
      </footer>
    </div>
  </div>
</template>
