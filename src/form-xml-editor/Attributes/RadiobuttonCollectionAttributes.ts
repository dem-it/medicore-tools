import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes";

export interface RadiobuttonCollectionAttributes extends CollectionOptionsAttributes {
}

export const Construct = (attributes : Record<string, string>): RadiobuttonCollectionAttributes => {
    return ConstructCollectionOptions(attributes)
}

export const ConstructDefaultRadiobuttonCollection = (): RadiobuttonCollectionAttributes => {
    return {
        visible: true,
        name: `radiobuttoncollection-${Date.now()}`,
        exportable: true,
        label: "Radiobuttons",
        value: "",
        mandatory: false
    }
}