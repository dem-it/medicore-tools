import { AttributesBase } from "./AttributesBase"

export interface NumericAttributes extends AttributesBase {
    visible: boolean;
    displayLabel: boolean;
    label: string;
    value?: number;
    exportable: boolean;
    mandatory: boolean;
    format: string;
}

export const Construct = (attributes : Record<string, string>): NumericAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        displayLabel: attributes['displayLabel'] === "true",
        label: attributes['label'],
        value: attributes['value'] ? parseInt(attributes['value']) : undefined,
        exportable: attributes['exportable'] === "true",
        mandatory: attributes['mandatory'] === "true",
        format: attributes['format']
    }
}

export const ConstructDefaultNumeric = (formName: string): NumericAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-numeric-${Date.now()}`,
        displayLabel: true,
        label: "Nummer waarde",
        value: undefined,
        exportable: true,
        mandatory: false,
        format: ""
    }
}
