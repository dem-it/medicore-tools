import { AttributesBase } from "./AttributesBase"

export interface TemplateFormAttributes extends AttributesBase {
    employeeId: number;
    active: boolean;
    lockTime: string;
    category: number;   
    emrType: number;
    isQuestionnaireEnabled: boolean;
    exportable: boolean;
    isPartOfCareplan: boolean;
}

export const Construct = (attributes : Record<string, string>): TemplateFormAttributes => {
    return {
        uuid: attributes['uuid'],
        name: attributes['name'],
        employeeId: parseInt(attributes['employeeId']),
        active: attributes['active'] === "true",
        lockTime: attributes['lockTime'],
        category: parseInt(attributes['category']),
        emrType: parseInt(attributes['emrType']),
        isQuestionnaireEnabled: attributes['isQuestionnaireEnabled'] === "true",
        exportable: attributes['exportable'] === "true",
        isPartOfCareplan: attributes['isPartOfCareplan'] === "true"
    }
}
