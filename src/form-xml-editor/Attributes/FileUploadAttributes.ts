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

export const ConstructDefaultFileUpload = (): FileUploadAttributes => {
    return {
        visible: true,
        name: `fileupload-${Date.now()}`,
        label: "Upload een bestand",
        value: "",
        mandatory: false,
        exportable: true
    }
}


export const ConstructDefaultImageUpload = (): FileUploadAttributes => {
    return {
        visible: true,
        name: `imageupload-${Date.now()}`,
        label: "Upload een plaatje",
        value: "",
        mandatory: false,
        exportable: true
    }
}