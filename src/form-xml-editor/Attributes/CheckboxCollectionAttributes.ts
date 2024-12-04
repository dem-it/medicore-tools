export interface CheckboxCollectionAttributes {
    name: string;
    visible: boolean;
    label: string;
    exportable: boolean;
}

export const Construct = (attributes : Record<string, string>): CheckboxCollectionAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        exportable: attributes['exportable'] === "true",
        label: attributes['label'],
    }
}
