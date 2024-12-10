export interface OptionAttributes {
    name: string;
    visible: boolean;
    label: string;
    value: string;
    active: boolean;
}

export const Construct = (attributes : Record<string, string>): OptionAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        active: attributes['exportable'] === "true",
        label: attributes['label'],
        value: attributes['value'],
    }
}

export const ConstructDefaultOption = (): OptionAttributes => {
    return {
        visible: true,
        name: `option-${Date.now()}`,
        active: true,
        label: "Optie",
        value: "0",
    }
}