export interface FixedTextAttributes {
    visible: boolean;
    displayLabel: boolean;
    label: string;
    value: string;
    exportable: boolean;
}

export const Construct = (attributes : Record<string, string>): FixedTextAttributes => {
    return {
        visible: attributes['visible'] === "true",
        displayLabel: attributes['displayLabel'] === "true",
        label: attributes['label'],
        value: attributes['value'],
        exportable: attributes['exportable'] === "true"
    }
}
