/**
* @summary Displays inspection information and telemetry readings.
* @author Benjamin Solorzano
*/
<script setup>

import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

import {useInspectionsStore} from '../../application/inspections.store.js';
import {useSectionStore} from '../../../section/application/section.store.js';

const props = defineProps({
  inspection: {
    type: Object,
    required: true
  }
});

const {t, locale} = useI18n();

const inspectionsStore = useInspectionsStore();
const sectionStore = useSectionStore();

const telemetry = computed(() =>
    inspectionsStore.getTelemetryByInspection(props.inspection)
);

const telemetryCount = computed(() =>
    inspectionsStore.getTelemetryCount(props.inspection)
);

const modelName = computed(() =>
    sectionStore.getModelName(props.inspection.modelId)
);

const sectionName = computed(() =>
    sectionStore.getSectionName(props.inspection.pitSectionId)
);

const statusSeverity = computed(() => {
  switch (props.inspection.status) {
    case 'OPERATIONAL':
      return 'success';
    case 'MAINTENANCE_REQUIRED':
      return 'danger';
    case 'INACTIVE':
      return 'secondary';
    default:
      return 'info';
  }
});

function formatNumber(value) {
  return new Intl.NumberFormat(locale.value, {
    maximumFractionDigits: 2
  }).format(value);
}

function formatDate(value) {
  if (!value) return '-';

  return new Intl.DateTimeFormat(
      locale.value === 'es' ? 'es-PE' : 'en-US',
      {
        dateStyle: 'medium',
        timeZone: 'UTC'
      }
  ).format(new Date(value));
}
</script>

<template>
  <pv-card class="h-full shadow-2">
    <template #title>
      <div class="flex flex-column gap-2">
        <span class="text-xl font-bold">
          {{ modelName }}
        </span>

        <span class="text-base text-color-secondary">
          {{ t('machinery-code') }}:
          {{ inspection.machineryCode }}
        </span>
      </div>
    </template>

    <template #subtitle>
      <div class="flex flex-column gap-2">
        <span>{{ sectionName }}</span>

        <pv-tag
            :value="inspection.status"
            :severity="statusSeverity"
            class="align-self-start"
        />
      </div>
    </template>

    <template #content>
      <div class="flex flex-column gap-2 mb-3">
        <div class="flex justify-content-between gap-2">
          <span>{{ t('inspector') }}</span>
          <strong>{{ inspection.inspectorName }}</strong>
        </div>

        <div class="flex justify-content-between gap-2">
          <span>{{ t('inspection-date') }}</span>
          <strong>{{ formatDate(inspection.inspectedAt) }}</strong>
        </div>

        <div class="flex justify-content-between gap-2">
          <span>{{ t('operating-hours') }}</span>
          <strong>
            {{ formatNumber(inspection.operatingHours) }} h
          </strong>
        </div>
      </div>

      <pv-divider/>

      <div v-if="telemetry.length === 0" class="text-center p-4">
        <i class="pi pi-info-circle text-3xl"></i>
        <p>{{ t('no-telemetry') }}</p>
      </div>

      <div
          v-for="reading in telemetry"
          :key="reading.id"
          class="surface-ground border-round p-3 mb-3"
      >
        <div class="flex justify-content-between align-items-center mb-3">
          <strong>#{{ reading.id }}</strong>

          <pv-tag
              :value="reading.alertTriggered ? t('alert') : t('normal')"
              :severity="reading.alertTriggered ? 'danger' : 'success'"
          />
        </div>

        <div class="flex justify-content-between mb-2 gap-2">
          <span>{{ t('engine-temperature') }}</span>
          <strong>
            {{ formatNumber(reading.engineTemperatureC) }} °C
          </strong>
        </div>

        <div class="flex justify-content-between mb-2 gap-2">
          <span>{{ t('oil-pressure') }}</span>
          <strong>
            {{ formatNumber(reading.oilPressurePsi) }} PSI
          </strong>
        </div>

        <div class="flex justify-content-between gap-2">
          <span>{{ t('vibration') }}</span>
          <strong>
            {{ formatNumber(reading.vibrationMmS) }} mm/s
          </strong>
        </div>
      </div>

      <div
          v-if="inspection.notes"
          class="text-color-secondary text-sm mt-3"
      >
        <strong>{{ t('notes') }}:</strong>
        {{ inspection.notes }}
      </div>
    </template>

    <template #footer>
      <pv-divider/>

      <div class="flex justify-content-between mb-3">
        <strong>{{ t('telemetry-count') }}</strong>
        <pv-tag :value="String(telemetryCount)" severity="info"/>
      </div>

      <div class="flex justify-content-between gap-2">
        <strong>{{ t('available-capacity') }}</strong>
        <span class="text-color-secondary">
          {{ t('capacity-unavailable') }}
        </span>
      </div>
    </template>
  </pv-card>
</template>