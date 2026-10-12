/**
* @summary Maps inspection resources into domain entities.
* @author Student Name
*/

import {Inspection} from "../domain/model/inspections.entity.js";


export class InspectionAssembler {
    static toEntity(resource) {
        return new Inspection(resource);
    }

    static toEntities(resources) {
        return resources.map(resource => this.toEntity(resource));
    }
}