<script setup>
/**
 * @summary Displays the mining inspections dashboard.
 * @author Benjamin Solozano
 */

import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import InspectionSummary from '../components/inspections-summary.vue';
import { useInspectionsStore } from '../../application/inspections.store.js';
import { useSectionStore } from '../../../section/application/section.store.js';

const { t } = useI18n();

const inspectionsStore = useInspectionsStore();
const sectionStore = useSectionStore();

const error = ref(false);

onMounted(async () => {
  try {
    await Promise.all([
      inspectionsStore.fetchAll(),
      sectionStore.fetchCatalogs()
    ]);
  } catch {
    error.value = true;
  }
});
</script>

<template>
  <section aria-label="Home">
    <h1 class="text-3xl font-bold mb-2">
      {{ t('home') }}
    </h1>

    <p class="text-lg text-color-secondary mb-5">
      {{ t('home-description') }}
    </p>

    <h2 class="text-2xl font-semibold mb-4">
      {{ t('my-inspections') }}
    </h2>

    <div
        v-if="inspectionsStore.loading || sectionStore.loading"
        class="flex justify-content-center p-6"
    >
      <pv-progress-spinner :aria-label="t('loading')" />
    </div>

    <pv-message
        v-else-if="error"
        severity="error"
    >
      {{ t('load-error') }}
    </pv-message>

    <pv-message
        v-else-if="inspectionsStore.inspections.length === 0"
        severity="info"
    >
      {{ t('no-inspections') }}
    </pv-message>

    <div v-else class="grid">
      <div
          v-for="inspection in inspectionsStore.inspections"
          :key="inspection.id"
          class="col-12 md:col-6"
      >
        <inspection-summary :inspection="inspection" />
      </div>
    </div>
  </section>
</template>