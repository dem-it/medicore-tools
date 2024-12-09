import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes";

export interface SearchSelectAttributes extends CollectionOptionsAttributes {
}

export const Construct = (attributes : Record<string, string>): SearchSelectAttributes => {
    return ConstructCollectionOptions(attributes)
}

export const ConstructDefaultSearchSelect = (): SearchSelectAttributes => {
    return {
        visible: true,
        name: `searchselect-${Date.now()}`,
        exportable: true,
        label: "Selecteer met zoekfunctie",
        value: "",
        mandatory: false
    }
}