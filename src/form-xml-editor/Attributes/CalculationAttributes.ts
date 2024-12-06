export interface CalculationAttributes {
    name: string;
    label: string;
    displayLabel: boolean;
    value: string;
    visible: boolean;
    formula: string;
    decimals: number;
    rounding: string;
    exportable: boolean;        
}

export const Construct = (attributes : Record<string, string>): CalculationAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        displayLabel: attributes['displayLabel'] === "true",
        exportable: attributes['exportable'] === "true",
        formula: attributes['formula'],
        decimals: parseInt(attributes['decimals']),
        rounding: attributes['rounding']
    }
}
