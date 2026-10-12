/**
 * @summary Manages inspection and telemetry state.
 * @author Benjamin Solorzano
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { InspectionsApi } from '../infrastructure/inspections-api.js';
import { InspectionAssembler } from '../infrastructure/inspections.assembler.js';
import { TelemetryAssembler } from '../infrastructure/telemetry.assembler.js';

export const useInspectionsStore = defineStore('inspections', () => {
    const inspections = ref([]);
    const telemetryReadings = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;

        try {
            const [inspectionResources, telemetryResources] =
                await Promise.all([
                    InspectionsApi.getInspections(),
                    InspectionsApi.getTelemetry()
                ]);

            inspections.value =
                InspectionAssembler.toEntities(inspectionResources);

            telemetryReadings.value =
                TelemetryAssembler.toEntities(telemetryResources);
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function getTelemetryByInspection(inspection) {
        if (!inspection) return [];

        return telemetryReadings.value.filter(
            reading =>
                String(reading.inspectionRecordId) ===
                String(inspection.id)
        );
    }

    function getTelemetryCount(inspection) {
        return getTelemetryByInspection(inspection).length;
    }

    function getAverageTemperature(inspection) {
        const readings = getTelemetryByInspection(inspection);

        if (readings.length === 0) return null;

        const total = readings.reduce(
            (sum, reading) => sum + reading.engineTemperatureC,
            0
        );

        return total / readings.length;
    }

    function getAlertCount(inspection) {
        return getTelemetryByInspection(inspection).filter(
            reading => reading.alertTriggered
        ).length;
    }

    async function createTelemetry(form) {
// Reload inspections before submitting the request.
        await fetchAll();

        const inspection = inspections.value.find(
            item => String(item.id) === String(form.inspectionId)
        );

        if (!inspection) {
            throw new Error('Inspection not found');
        }

        if (
            String(inspection.machineryCode) !==
            String(form.machineryCode) ||
            String(inspection.pitSectionId) !==
            String(form.pitSectionId) ||
            String(inspection.modelId) !==
            String(form.modelId)
        ) {
            throw new Error('Invalid inspection selection');
        }

        const request = TelemetryAssembler.toCreateRequest(form);

        const resource = await InspectionsApi.createTelemetry(request);

        telemetryReadings.value.push(
            TelemetryAssembler.toEntity(resource)
        );

        return resource;
    }

    return {
        inspections,
        telemetryReadings,
        loading,
        error,
        fetchAll,
        getTelemetryByInspection,
        getTelemetryCount,
        getAverageTemperature,
        getAlertCount,
        createTelemetry
    };
});