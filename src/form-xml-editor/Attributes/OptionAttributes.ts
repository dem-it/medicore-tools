import { AttributesBase } from "./AttributesBase"

export interface OptionAttributes extends AttributesBase {
    visible: boolean;
    label: string;
    value: string;
    active: boolean;
}

export const Construct = (attributes : Record<string, string>): OptionAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        active: attributes['exportable'] === "true",
        label: attributes['label'],
        value: attributes['value'],
    }
}

export const ConstructDefaultOption = (formName: string): OptionAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-option-${Date.now()}`,
        active: true,
        label: "Optie",
        value: "0",
    }
}