export interface CollectionOptionsAttributes {
    name: string;
    visible: boolean;
    label: string;
    value: string;
    mandatory: boolean;
    exportable: boolean;
}

export const Construct = (attributes : Record<string, string>): CollectionOptionsAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        exportable: attributes['exportable'] === "true",
        label: attributes['label'],
        value: attributes['value'],
        mandatory: attributes['mandatory'] === "true",
    }
}
