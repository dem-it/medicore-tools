import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes"

export type SearchSelectAttributes = CollectionOptionsAttributes

export const Construct = (attributes : Record<string, string>): SearchSelectAttributes => {
    return ConstructCollectionOptions(attributes)
}

export const ConstructDefaultSearchSelect = (formName: string): SearchSelectAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-searchselect-${Date.now()}`,
        exportable: true,
        label: "Selecteer met zoekfunctie",
        value: "",
        mandatory: false
    }
}