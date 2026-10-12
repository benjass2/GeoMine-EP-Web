<script setup>
import AppToolbar from './shared/presentation/components/toolbar.vue';
import AppSidebar from './shared/presentation/components/sidebar.vue';
</script>

<template>
  <div class="min-h-screen surface-ground">
    <app-toolbar />
      <app-sidebar />
      <main>
        <router-view />
      </main>
  </div>
</template>