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

export const ConstructDefaultDate = (): DateAttributes => {
    return {
        visible: true,
        name: `date-${Date.now()}`,
        label: 'Datum',
        value: "2024-01-01",
        mandatory: false,
        buttonlabel: "Label",
        buttonactive: true,
        dateformat: "DATE",
        exportable: true
    }
}


export const ConstructDefaultDateTime = (): DateAttributes => {
    return {
        visible: true,
        name: `date-${Date.now()}`,
        label: 'Datum en tijd',
        value: "2024-01-01 08:45",
        mandatory: false,
        buttonlabel: "Label",
        buttonactive: true,
        dateformat: "DATE_TIME",
        exportable: true
    }
}
