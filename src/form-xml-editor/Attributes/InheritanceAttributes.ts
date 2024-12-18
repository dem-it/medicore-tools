export interface InheritanceAttributes {
    name: string;
    label: string;
    displayLabel: boolean;
    value: string;
    visible: boolean;
    templateFormUuid: string;
    fieldUuid: string;
    exportable: boolean;
}

export const Construct = (attributes : Record<string, string>): InheritanceAttributes => {
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

export const ConstructDefaultInheritance = (): InheritanceAttributes => {
    return {
        visible: true,
        name: `inheritance-${Date.now()}`,
        label: "Overerving",
        value: "",
        displayLabel: true,
        templateFormUuid: "999999",
        fieldUuid: "999999",
        exportable: true
    }
}