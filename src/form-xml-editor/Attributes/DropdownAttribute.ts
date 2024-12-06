import { CollectionOptionsAttribute, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttribute";

export interface DropdownAttribute extends CollectionOptionsAttribute {
}

export const Construct = (attributes : Record<string, string>): DropdownAttribute => {
    return ConstructCollectionOptions(attributes)
}
