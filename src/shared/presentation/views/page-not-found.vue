<script setup>
/**
 * @summary Displays an error page for unsupported routes.
 * @author Benjamin Solorzano
 */

import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <section>

    <h1>404 - {{ t('page-not-found') }}</h1>

    <p>
      {{ t('unknown-route') }}
      <strong>{{ route.fullPath }}</strong>
    </p>

    <pv-button
        :label="t('return-home')"
        icon="pi pi-home"
        @click="router.push('/home')"
    />
  </section>
</template>

<style scoped>
  section{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }


</style>