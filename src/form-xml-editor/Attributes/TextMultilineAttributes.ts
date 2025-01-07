import { AttributesBase } from './AttributesBase'

export interface TextMultilineAttributes extends AttributesBase {
    label: string;
    displayLabel: boolean;
    value: string;
    mandatory: boolean;
    exportable: boolean;
    visible: boolean;
    rows: number;
}

export const Construct = (attributes : Record<string, string>): TextMultilineAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        displayLabel: attributes['buttonlabel'] === "true",
        exportable: attributes['exportable'] === "true",
        mandatory: attributes['mandatory'] === "true",
        rows: parseInt(attributes['rows'])
    }
}

export const ConstructDefaultTextMultiline = (formName: string): TextMultilineAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-textmultiline-${Date.now()}`,
        label: "Tekstvak meerdere regels",
        value: "",
        displayLabel: true,
        exportable: true,
        mandatory: false,
        rows: 3
    }
}