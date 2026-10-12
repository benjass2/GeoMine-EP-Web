<script setup>
/**
 * @summary Provides navigation and language switching.
 * @author Benjamin Solorzano
 */

import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

function changeLanguage(language) {
  locale.value = language;
}
</script>

<template>
  <aside
      class="surface-card shadow-1 flex flex-column justify-content-between p-3"
      style="width: 250px; min-height: calc(100vh - 80px)"
      aria-label="Main navigation"
  >
    <nav class="flex flex-column gap-2">
      <router-link
          to="/home"
          custom
          v-slot="{ navigate }"
      >
        <pv-button
            :label="t('home')"
            icon="pi pi-home"
            severity="secondary"
            text
            class="w-full"
            @click="navigate"
        />
      </router-link>

      <router-link
          to="/telemetry/items/new"
          custom
          v-slot="{ navigate }"
      >
        <pv-button
            :label="t('new-telemetry')"
            icon="pi pi-plus-circle"
            severity="secondary"
            text
            class="w-full"
            @click="navigate"
        />
      </router-link>
    </nav>

    <div class="flex gap-2">
      <pv-button
          label="EN"
          class="flex-1"
          :outlined="locale !== 'en'"
          :aria-pressed="locale === 'en'"
          @click="changeLanguage('en')"
      />

      <pv-button
          label="ES"
          class="flex-1"
          :outlined="locale !== 'es'"
          :aria-pressed="locale === 'es'"
          @click="changeLanguage('es')"
      />
    </div>
  </aside>
</template>