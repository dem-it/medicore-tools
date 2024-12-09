export interface TextAttributes {
    name: string;
    label: string;
    displayLabel: boolean;
    value: string;
    mandatory: boolean;
    exportable: boolean;
    visible: boolean;
}

export const Construct = (attributes : Record<string, string>): TextAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        displayLabel: attributes['buttonlabel'] === "true",
        exportable: attributes['exportable'] === "true",
        mandatory: attributes['mandatory'] === "true"
    }
}

export const ConstructDefaultText = (): TextAttributes => {
    return {
        visible: true,
        name: `text-${Date.now()}`,
        label: "Tekstvak",
        value: "",
        displayLabel: true,
        exportable: true,
        mandatory: false
    }
}
