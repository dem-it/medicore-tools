import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes";

export interface DropdownAttributes extends CollectionOptionsAttributes {
}

export const Construct = (attributes : Record<string, string>): DropdownAttributes => {
    return ConstructCollectionOptions(attributes)
}
