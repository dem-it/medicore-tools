export interface OptionAttribute {
    name: string;
    visible: boolean;
    label: string;
    value: string;
    active: boolean;
}

export const Construct = (attributes : Record<string, string>): OptionAttribute => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        active: attributes['exportable'] === "true",
        label: attributes['label'],
        value: attributes['value'],
    }
}
