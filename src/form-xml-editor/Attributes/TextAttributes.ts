import { AttributesBase } from "./AttributesBase"

export interface TextAttributes extends AttributesBase {
    label: string;
    displayLabel: boolean;
    value: string;
    mandatory: boolean;
    exportable: boolean;
    visible: boolean;
}

export const Construct = (attributes : Record<string, string>): TextAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        displayLabel: attributes['buttonlabel'] === "true",
        exportable: attributes['exportable'] === "true",
        mandatory: attributes['mandatory'] === "true"
    }
}

export const ConstructDefaultText = (formName: string): TextAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-text-${Date.now()}`,
        label: "Tekstvak",
        value: "",
        displayLabel: true,
        exportable: true,
        mandatory: false
    }
}
