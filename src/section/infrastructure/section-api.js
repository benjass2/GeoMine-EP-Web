/**
 * @summary Provides external catalog API operations.
 * @author Student Name
 */

import {externalHttp} from "../../shared/infrastructure/http/http-instance.js";

export class SectionApi {
    static async getSections() {
        const response = await externalHttp.get(
            import.meta.env.VITE_PIT_SECTIONS_URL
        );

        return response.data;
    }

    static async getMachineryModels() {
        const response = await externalHttp.get(
            import.meta.env.VITE_MACHINERY_MODELS_URL
        );

        return response.data;
    }
}
