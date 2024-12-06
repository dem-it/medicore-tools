import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes";

export interface SearchSelectAttributes extends CollectionOptionsAttributes {
}

export const Construct = (attributes : Record<string, string>): SearchSelectAttributes => {
    return ConstructCollectionOptions(attributes)
}
