/**
 * @summary Represents a telemetry reading.
 * @author Benjamin Solorzano
 */

export class Telemetry {
    constructor({id, inspectionRecordId, machineryCode, engineTemperatureC, oilPressurePsi, vibrationMmS, alertTriggered, registeredAt}) {
        this.id = id;
        this.inspectionRecordId = inspectionRecordId;
        this.machineryCode = machineryCode;
        this.engineTemperatureC = Number(engineTemperatureC);
        this.oilPressurePsi = Number(oilPressurePsi);
        this.vibrationMmS = Number(vibrationMmS);
        this.alertTriggered = Boolean(alertTriggered);
        this.registeredAt = registeredAt;
    }
}