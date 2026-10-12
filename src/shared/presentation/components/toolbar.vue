<script setup>
/**
 * @summary Displays the GeoMine application toolbar.
 * @author Benjamin Solorzano
 */

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const logoDomain = import.meta.env.VITE_LOGO_DOMAIN;
const logoUrl = `https://img.logo.dev/${logoDomain}?size=64`;
</script>

<template>
  <pv-toolbar
      class="shadow-2 border-noround"
      aria-label="GeoMine application toolbar"
  >
    <template #start>
      <div class="flex align-items-center gap-3">
        <img
            :src="logoUrl"
            alt="GeoMine logo"
            width="45"
            height="45"
            @error="$event.target.style.display = 'none'"
        />

        <span class="text-xl font-bold text-primary">
          {{ t('app-title') }}
        </span>
      </div>
    </template>
  </pv-toolbar>
</template>