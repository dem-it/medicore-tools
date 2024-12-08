export interface InterformValueAttributes {
    name: string;
    label: string;
    displayLabel: boolean;
    value: string;
    visible: boolean;
    templateFormUuid: string;
    fieldUuid: string;
    exportable: boolean;
}

export const Construct = (attributes : Record<string, string>): InterformValueAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        displayLabel: attributes['displayLabel'] === "true",
        templateFormUuid: attributes['templateFormUuid'],
        fieldUuid: attributes['fieldUuid'],
        exportable: attributes['exportable'] === "true"
    }
}
