import { AttributesBase } from "./AttributesBase"

export interface CalculationAttributes extends AttributesBase {
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
        uuid: attributes['uuid'],
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

export const ConstructDefaultCalculation = (formName: string): CalculationAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-calculation-${Date.now()}`,
        label: 'Berekening',
        value: "",
        displayLabel: true,
        exportable: true,
        formula: "{Veld1}x{veld2}",
        decimals: 2,
        rounding: "standard"
    }
}
