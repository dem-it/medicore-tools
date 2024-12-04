export interface CollectionAttributes {
    name: string;
    visible: boolean;
    style: string;
    tabtype: string;
    exportable: boolean;
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
        style: attributes['style']
    }
}
