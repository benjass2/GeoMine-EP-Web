/**
 * @summary Manages section and machinery catalog state.
 * @author Benjamin Solorzano
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { SectionApi } from '../infrastructure/section-api.js';
import { SectionAssembler } from '../infrastructure/section.assembler.js';

export const useSectionStore = defineStore('section', () => {
    const sections = ref([]);
    const machineryModels = ref([]);
    const loading = ref(false);
    const loaded = ref(false);
    const error = ref(null);

    async function fetchCatalogs(force = false) {
        if (loaded.value && !force) return;

        loading.value = true;
        error.value = null;

        try {
            const [sectionsResponse, machineryResponse] =
                await Promise.all([
                    SectionApi.getSections(),
                    SectionApi.getMachineryModels()
                ]);

            if (
                !Array.isArray(sectionsResponse) ||
                !Array.isArray(machineryResponse)
            ) {
                throw new Error('Invalid catalog response');
            }

            sections.value = sectionsResponse.map(
                SectionAssembler.toSectionEntity
            );

            machineryModels.value = machineryResponse.map(
                SectionAssembler.toMachineryEntity
            );

            loaded.value = true;
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function getSectionName(sectionId) {
        const section = sections.value.find(
            item => String(item.id) === String(sectionId)
        );

        return section?.name ?? `Section ${sectionId}`;
    }

    function getModelName(modelId) {
        const model = machineryModels.value.find(
            item => String(item.id) === String(modelId)
        );

        return model?.modelName ?? `Model ${modelId}`;
    }

    function getMachineryBySection(sectionId) {
        return machineryModels.value.filter(
            model => String(model.idSection) === String(sectionId)
        );
    }

    return {
        sections,
        machineryModels,
        loading,
        loaded,
        error,
        fetchCatalogs,
        getSectionName,
        getModelName,
        getMachineryBySection
    };
});
