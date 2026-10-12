/**
 * @summary Maps telemetry resources and creation requests.
 * @author Benjamin Solorzano
 */

import { Telemetry } from '../domain/model/telemetry.entity.js';

export class TelemetryAssembler {
    static toEntity(resource) {
        return new Telemetry(resource);
    }

    static toEntities(resources) {
        return resources.map(resource => this.toEntity(resource));
    }

    static toCreateRequest(form) {
        return {
            inspectionRecordId: form.inspectionId,
            machineryCode: form.machineryCode,
            engineTemperatureC: Number(form.engineTemperatureC),
            oilPressurePsi: Number(form.oilPressurePsi),
            vibrationMmS: Number(form.vibrationMmS),
            alertTriggered: Boolean(form.alertTriggered),
            registeredAt: new Date().toISOString()
        };
    }
}