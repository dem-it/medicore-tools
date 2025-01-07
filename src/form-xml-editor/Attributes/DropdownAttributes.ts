import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes";

export type DropdownAttributes = CollectionOptionsAttributes

export const Construct = (attributes : Record<string, string>): DropdownAttributes => {
    return ConstructCollectionOptions(attributes)
}

export const ConstructDefaultDropdown = (): DropdownAttributes => {
    return {
        visible: true,
        name: `dropdown-${Date.now()}`,
        exportable: true,
        label: "Dropdown",
        value: "",
        mandatory: false
    }
}