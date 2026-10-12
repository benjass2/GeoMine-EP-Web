<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

/**
 * @summary Displays a message for unknown application routes.
 * @author Benjamin Solorzano
 */

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

function goHome() {
  router.push('/home');
}
</script>

<template>
  <main class="not-found-page">
    <h1>404</h1>

    <h2>{{ t('notFound.title') }}</h2>

    <p>
      {{ t('notFound.message') }}
    </p>

    <p class="unknown-path">
      {{ route.path }}
    </p>

    <pv-button
        :label="t('notFound.backHome')"
        icon="pi pi-home"
        @click="goHome"
    />
  </main>
</template>

<style scoped>
.not-found-page {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.not-found-page h1 {
  font-size: 5rem;
  margin: 0;
  color: #2563eb;
}

.not-found-page h2 {
  margin: 0;
}

.unknown-path {
  font-family: monospace;
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  overflow-wrap: anywhere;
}
</style>