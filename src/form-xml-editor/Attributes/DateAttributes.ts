export interface DateAttributes {
    name: string;
    label: string;
    value: string;
    mandatory: boolean;
    buttonlabel: string;
    buttonactive: boolean;
    dateformat: string;
    exportable: boolean;
    visible: boolean;
}

export const Construct = (attributes : Record<string, string>): DateAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        label: attributes['label'],
        value: attributes['value'],
        mandatory: attributes['mandatory'] === "true",
        buttonlabel: attributes['buttonlabel'],
        buttonactive: attributes['buttonactive'] === "true",
        dateformat: attributes['dateformat'],
        exportable: attributes['exportable'] === "true"
    }
}
