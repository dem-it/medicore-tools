import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes"

export type RadiobuttonCollectionAttributes = CollectionOptionsAttributes

export const Construct = (attributes : Record<string, string>): RadiobuttonCollectionAttributes => {
    return ConstructCollectionOptions(attributes)
}

export const ConstructDefaultRadiobuttonCollection = (formName: string): RadiobuttonCollectionAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-radiobuttoncollection-${Date.now()}`,
        exportable: true,
        label: "Radiobuttons",
        value: "",
        mandatory: false
    }
}