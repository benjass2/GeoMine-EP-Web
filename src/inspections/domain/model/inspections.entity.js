/**
 * @summary Represents a machinery inspection record.
 * @author Benjamin Solorzano
 */

export class Inspection {
    constructor({id, machineryCode, modelId, pitSectionId, inspectorName, status, operatingHours, notes, inspectedAt}) {
        this.id = id;
        this.machineryCode = machineryCode;
        this.modelId = modelId;
        this.pitSectionId = pitSectionId;
        this.inspectorName = inspectorName;
        this.status = status;
        this.operatingHours = Number(operatingHours);
        this.notes = notes;
        this.inspectedAt = inspectedAt;
    }
}