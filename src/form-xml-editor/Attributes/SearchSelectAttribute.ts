import { CollectionOptionsAttribute, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttribute";

export interface SearchSelectAttribute extends CollectionOptionsAttribute {
}

export const Construct = (attributes : Record<string, string>): SearchSelectAttribute => {
    return ConstructCollectionOptions(attributes)
}
