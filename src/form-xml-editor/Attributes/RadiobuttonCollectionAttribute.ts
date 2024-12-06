import { CollectionOptionsAttribute, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttribute";

export interface RadiobuttonCollectionAttribute extends CollectionOptionsAttribute {
}

export const Construct = (attributes : Record<string, string>): RadiobuttonCollectionAttribute => {
    return ConstructCollectionOptions(attributes)
}
