export interface TextMultilineAttributes {
    name: string;
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
