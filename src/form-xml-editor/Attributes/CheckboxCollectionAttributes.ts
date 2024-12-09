import { AttributesBase } from "./AttributesBase";

export interface CheckboxCollectionAttributes extends AttributesBase {
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

export const ConstructDefaultCheckboxCollection = (): CheckboxCollectionAttributes => {
    return {
        visible: true,
        name: `checkboxcollection-${Date.now()}`,
        exportable: true,
        label: "Checkboxes",
    }
}
