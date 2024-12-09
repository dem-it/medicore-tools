export interface NumericAttributes {
    name: string;
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

export const ConstructDefaultNumeric = (): NumericAttributes => {
    return {
        visible: true,
        name: `numeric-${Date.now()}`,
        displayLabel: true,
        label: "Nummer waarde",
        value: undefined,
        exportable: true,
        mandatory: false,
        format: ""
    }
}
