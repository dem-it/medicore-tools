import { AttributesBase } from "./AttributesBase"

export interface CheckboxCollectionAttributes extends AttributesBase {
    visible: boolean;
    label: string;
    exportable: boolean;
}

export const Construct = (attributes : Record<string, string>): CheckboxCollectionAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        exportable: attributes['exportable'] === "true",
        label: attributes['label'],
    }
}

export const ConstructDefaultCheckboxCollection = (formName: string): CheckboxCollectionAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-checkboxcollection-${Date.now()}`,
        exportable: true,
        label: "Checkboxes",
    }
}
