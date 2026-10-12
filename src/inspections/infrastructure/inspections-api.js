/**
 * @summary Provides inspection and telemetry REST operations.
 * @author Student Name
 */

import {http} from "../../shared/infrastructure/http/http-instance.js";


const INSPECTIONS_ENDPOINT = '/inspection-records';
const TELEMETRY_ENDPOINT = '/telemetry-readings';

export class InspectionsApi {
    static async getInspections() {
        const response = await http.get(INSPECTIONS_ENDPOINT);
        return response.data;
    }

    static async getTelemetry() {
        const response = await http.get(TELEMETRY_ENDPOINT);
        return response.data;
    }

    static async createTelemetry(resource) {
        const response = await http.post(
            TELEMETRY_ENDPOINT,
            resource
        );

        return response.data;
    }
}
