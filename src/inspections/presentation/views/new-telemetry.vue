/**
* @summary Provides telemetry registration for mining inspections.
* @author Benjamin Solorzano
*/
<script>
import {ref, computed, onMounted, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';

import {useInspectionsStore} from '../../application/inspections.store.js';
import {useSectionStore} from '../../../section/application/section.store.js';

const router = useRouter();
const {t} = useI18n();

const inspectionsStore = useInspectionsStore();
const sectionStore = useSectionStore();

const saving = ref(false);
const loadingError = ref(false);
const errorMessage = ref('');

const form = ref({
  pitSectionId: null,
  modelId: null,
  machineryCode: null,
  inspectionId: null,
  engineTemperatureC: null,
  oilPressurePsi: null,
  vibrationMmS: null,
  alertTriggered: false
});

const availableModels = computed(() => {
  if (form.value.pitSectionId === null) return [];

  return sectionStore.getMachineryBySection(
      form.value.pitSectionId
  );
});

const availableInspections = computed(() => {
  if (form.value.pitSectionId === null ||
      form.value.modelId === null) {
    return [];
  }

  return inspectionsStore.inspections.filter(
      inspection =>
          String(inspection.pitSectionId) ===
          String(form.value.pitSectionId) &&
          String(inspection.modelId) ===
          String(form.value.modelId)
  );
});

const machineryOptions = computed(() => {
  const codes = new Set();

  return availableInspections.value
      .filter(inspection => {
        if (codes.has(inspection.machineryCode)) return false;

        codes.add(inspection.machineryCode);
        return true;
      })
      .map(inspection => ({
        label: inspection.machineryCode,
        value: inspection.machineryCode
      }));
});

const inspectionOptions = computed(() =>
    availableInspections.value
        .filter(
            inspection =>
                String(inspection.machineryCode) ===
                String(form.value.machineryCode)
        )
        .map(inspection => ({
          label: `#${inspection.id} - ${inspection.inspectorName}`,
          value: inspection.id
        }))
);

const selectedInspection = computed(() =>
    inspectionsStore.inspections.find(
        inspection =>
            String(inspection.id) === String(form.value.inspectionId) &&
            String(inspection.machineryCode) ===
            String(form.value.machineryCode) &&
            String(inspection.modelId) ===
            String(form.value.modelId) &&
            String(inspection.pitSectionId) ===
            String(form.value.pitSectionId)
    )
);

const isValid = computed(() => {
  const data = form.value;

  return Boolean(selectedInspection.value) &&
      Number.isFinite(data.engineTemperatureC) &&
      Number.isFinite(data.oilPressurePsi) &&
      data.oilPressurePsi >= 0 &&
      Number.isFinite(data.vibrationMmS) &&
      data.vibrationMmS >= 0;
});

watch(
    () => form.value.pitSectionId,
    () => {
      form.value.modelId = null;
      form.value.machineryCode = null;
      form.value.inspectionId = null;
    }
);

watch(
    () => form.value.modelId,
    () => {
      form.value.machineryCode = null;
      form.value.inspectionId = null;
    }
);

watch(
    () => form.value.machineryCode,
    () => {
      form.value.inspectionId = null;
    }
);

function cancel() {
  router.push('/home');
}

async function createTelemetry() {
  errorMessage.value = '';

  if (!isValid.value) {
    errorMessage.value = t('required-fields');
    return;
  }

  saving.value = true;

  try {
    await inspectionsStore.createTelemetry(form.value);
    await router.push('/home');
  } catch {
    errorMessage.value = t('save-error');
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      inspectionsStore.fetchAll(),
      sectionStore.fetchCatalogs()
    ]);
  } catch {
    loadingError.value = true;
  }
});
</script>

<template>
  <section aria-label="New Telemetry">
    <h1 class="text-3xl font-bold mb-2">
      {{ t('new-telemetry') }}
    </h1>

    <p class="text-color-secondary mb-4">
      {{ t('add-telemetry') }}
    </p>

    <div
        v-if="inspectionsStore.loading || sectionStore.loading"
        class="flex justify-content-center p-6"
    >
      <pv-progress-spinner :aria-label="t('loading')"/>
    </div>

    <pv-message v-else-if="loadingError" severity="error">
      {{ t('load-error') }}
    </pv-message>

    <pv-card v-else class="max-w-50rem shadow-2">
      <template #title>
        {{ t('telemetry-reading') }}
      </template>

      <template #content>
        <form
            class="flex flex-column gap-4"
            aria-label="Telemetry registration form"
            @submit.prevent="createTelemetry"
        >
          <div class="flex flex-column gap-2">
            <label for="pit-section">
              {{ t('pit-section') }} *
            </label>

            <pv-select
                id="pit-section"
                v-model="form.pitSectionId"
                :options="sectionStore.sections"
                option-label="name"
                option-value="id"
                :placeholder="t('select-section')"
                class="w-full"
                aria-label="Pit section"
            />
          </div>

          <div class="flex flex-column gap-2">
            <label for="machinery-model">
              {{ t('model') }} *
            </label>

            <pv-select
                id="machinery-model"
                v-model="form.modelId"
                :options="availableModels"
                option-label="modelName"
                option-value="id"
                :placeholder="t('select-model')"
                :disabled="form.pitSectionId === null"
                class="w-full"
                aria-label="Machinery model"
            />
          </div>

          <div class="flex flex-column gap-2">
            <label for="machinery-code">
              {{ t('machinery-code') }} *
            </label>

            <pv-select
                id="machinery-code"
                v-model="form.machineryCode"
                :options="machineryOptions"
                option-label="label"
                option-value="value"
                :placeholder="t('select-machinery')"
                :disabled="form.modelId === null"
                class="w-full"
                aria-label="Machinery code"
            />
          </div>

          <pv-message
              v-if="form.modelId !== null &&
              machineryOptions.length === 0"
              severity="info"
          >
            {{ t('no-machinery') }}
          </pv-message>

          <div class="flex flex-column gap-2">
            <label for="inspection">
              {{ t('inspection') }} *
            </label>

            <pv-select
                id="inspection"
                v-model="form.inspectionId"
                :options="inspectionOptions"
                option-label="label"
                option-value="value"
                :placeholder="t('select-inspection')"
                :disabled="!form.machineryCode"
                class="w-full"
                aria-label="Inspection"
            />
          </div>

          <pv-message
              v-if="form.machineryCode &&
              inspectionOptions.length === 0"
              severity="info"
          >
            {{ t('no-inspection-machinery') }}
          </pv-message>

          <pv-message
              v-if="selectedInspection"
              severity="info"
          >
            {{ t('machinery-code') }}:
            {{ selectedInspection.machineryCode }}
            —
            {{ t('operating-hours') }}:
            {{ selectedInspection.operatingHours }} h
          </pv-message>

          <div class="flex flex-column gap-2">
            <label for="engine-temperature">
              {{ t('engine-temperature') }} (°C) *
            </label>

            <pv-input-number
                id="engine-temperature"
                v-model="form.engineTemperatureC"
                :min-fraction-digits="0"
                :max-fraction-digits="2"
                class="w-full"
                aria-label="Engine temperature"
            />
          </div>

          <div class="flex flex-column gap-2">
            <label for="oil-pressure">
              {{ t('oil-pressure') }} (PSI) *
            </label>

            <pv-input-number
                id="oil-pressure"
                v-model="form.oilPressurePsi"
                :min="0"
                :min-fraction-digits="0"
                :max-fraction-digits="2"
                class="w-full"
                aria-label="Oil pressure"
            />
          </div>

          <div class="flex flex-column gap-2">
            <label for="vibration">
              {{ t('vibration') }} (mm/s) *
            </label>

            <pv-input-number
                id="vibration"
                v-model="form.vibrationMmS"
                :min="0"
                :min-fraction-digits="0"
                :max-fraction-digits="2"
                class="w-full"
                aria-label="Vibration"
            />
          </div>

          <div class="flex align-items-center gap-3">
            <pv-checkbox
                v-model="form.alertTriggered"
                input-id="alert-triggered"
                binary
            />

            <label for="alert-triggered">
              {{ t('alert-triggered') }}
            </label>
          </div>

          <pv-message
              v-if="errorMessage"
              severity="error"
              role="alert"
          >
            {{ errorMessage }}
          </pv-message>

          <pv-divider/>

          <div class="flex justify-content-end gap-3">
            <pv-button
                type="button"
                :label="t('cancel')"
                icon="pi pi-times"
                severity="secondary"
                outlined
                @click="cancel"
            />

            <pv-button
                type="submit"
                :label="t('create')"
                icon="pi pi-check"
                :loading="saving"
                :disabled="!isValid || saving"
            />
          </div>
        </form>
      </template>
    </pv-card>
  </section>
</template>
