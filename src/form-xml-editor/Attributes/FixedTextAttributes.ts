import { AttributesBase } from "./AttributesBase"

export interface FixedTextAttributes extends AttributesBase {
    visible: boolean;
    displayLabel: boolean;
    label: string;
    value: string;
    exportable: boolean;
}

export const Construct = (attributes: Record<string, string>): FixedTextAttributes => {
    return {
        //uuid: attributes['uuid'],
        name: attributes['name'],
        visible: attributes['visible'] === "true",
        displayLabel: attributes['displayLabel'] === "true",
        label: attributes['label'],
        value: attributes['value'],
        exportable: attributes['exportable'] === "true"
    }
}

export const ConstructDefaultFixedText = (): FixedTextAttributes => {
    return {
        //uuid: '',
        name: `tekst-${Date.now()}`,
        visible: true,
        displayLabel: false,
        label: "",
        value: "Tekst",
        exportable: true
    }
}

export const ConstructDefaultFixedTextFat = (): FixedTextAttributes => {
    const defaultAttributes = ConstructDefaultFixedText()
    defaultAttributes.label = "Dikgedrukte tekst"
    defaultAttributes.displayLabel = true
    defaultAttributes.value = ''
    return defaultAttributes
}