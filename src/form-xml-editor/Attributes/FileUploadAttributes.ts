import { AttributesBase } from "./AttributesBase"

export interface FileUploadAttributes extends AttributesBase {
    label: string;
    value: string;
    mandatory: boolean;
    exportable: boolean;
    visible: boolean;
}

export const Construct = (attributes : Record<string, string>): FileUploadAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        exportable: attributes['exportable'] === "true",
        mandatory: attributes['mandatory'] === "true"
    }
}

export const ConstructDefaultFileUpload = (formName: string): FileUploadAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-fileupload-${Date.now()}`,
        label: "Upload een bestand",
        value: "",
        mandatory: false,
        exportable: true
    }
}


export const ConstructDefaultImageUpload = (formName: string): FileUploadAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-imageupload-${Date.now()}`,
        label: "Upload een plaatje",
        value: "",
        mandatory: false,
        exportable: true
    }
}