export interface FileUploadAttributes {
    name: string;
    label: string;
    value: string;
    mandatory: boolean;
    exportable: boolean;
    visible: boolean;
}

export const Construct = (attributes : Record<string, string>): FileUploadAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        exportable: attributes['exportable'] === "true",
        mandatory: attributes['mandatory'] === "true"
    }
}
