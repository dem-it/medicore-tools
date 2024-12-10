import { AttributesBase } from "./AttributesBase";

export interface CheckboxAttributes extends AttributesBase {
    visible: boolean;
    label: string;
    exportable: boolean;
    mandatory: boolean;
    value: string;
}

export const Construct = (attributes : Record<string, string>): CheckboxAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        exportable: attributes['exportable'] === "true",
        label: attributes['label'],
        mandatory: attributes['mandatory'] === "true",
        value: attributes['value'],
    }
}

export const ConstructDefaultCheckbox = (): CheckboxAttributes => {
    return {
        visible: true,
        name: `checkbox-${Date.now()}`,
        exportable: true,
        label: "Checkbox",
        mandatory: false,
        value: "0",
    }
}
