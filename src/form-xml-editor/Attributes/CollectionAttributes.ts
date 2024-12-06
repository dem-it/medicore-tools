export interface CollectionAttributes {
    name: string;
    visible: boolean;
    style: string;
    tabtype: string;
    exportable: boolean;
}

export interface CollectionBoxAttributes extends CollectionAttributes {
    label: string;
}

export interface CollectionTableAttributes extends CollectionAttributes {
    rows: number;
    columns: number;
}

export enum CollectionStyle {
    Tabs = "tabs",
    Tab = "tab",
    Box = "box",
    Table = "table"
}

export const Construct = (attributes : Record<string, string>): CollectionAttributes => {
    return {
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        exportable: attributes['exportable'] === "true",
        tabtype: attributes['tabtype'],
        style: attributes['style'],
    }
}

export const ConstructBox = (attributes : Record<string, string>): CollectionBoxAttributes => {
    const result = Construct(attributes) as CollectionBoxAttributes
    result.label = attributes['label']
    return result
}

export const ConstructTable = (attributes : Record<string, string>): CollectionTableAttributes => {
    const result = Construct(attributes) as CollectionTableAttributes
    result.rows = parseInt(attributes['rows'])
    result.columns = parseInt(attributes['columns'])
    return result
}