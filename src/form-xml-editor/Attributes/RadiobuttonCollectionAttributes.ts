import { CollectionOptionsAttributes, Construct as ConstructCollectionOptions } from "./CollectionOptionsAttributes";

export interface RadiobuttonCollectionAttributes extends CollectionOptionsAttributes {
}

export const Construct = (attributes : Record<string, string>): RadiobuttonCollectionAttributes => {
    return ConstructCollectionOptions(attributes)
}
