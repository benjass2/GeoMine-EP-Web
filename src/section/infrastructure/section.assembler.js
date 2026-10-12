/**
 * @summary Converts catalog API resources into domain entities.
 * @author Benjamin Solorzano
 */

import {Pit} from "../domain/model/pit.entity.js";
import {Machinery} from "../domain/model/machinery.entity.js";


export class SectionAssembler {
    static toSectionEntity(resource) {
        return new Pit(
            resource.id,
            resource.name
        );
    }

    static toMachineryEntity(resource) {
        return new Machinery(
            resource.id,
            resource.modelName,
            resource.manufacturer,
            resource.idSection
        );
    }
}

