import { AttributesBase } from "./AttributesBase"

export interface CollectionAttributes extends AttributesBase {
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

export const Construct = (attributes: Record<string, string>): CollectionAttributes => {
    return {
        uuid: attributes['uuid'],
        visible: attributes['visible'] === "true",
        name: attributes['name'],
        exportable: attributes['exportable'] === "true",
        tabtype: attributes['tabtype'],
        style: attributes['style'],
    }
}

export const ConstructBox = (attributes: Record<string, string>): CollectionBoxAttributes => {
    const result = Construct(attributes) as CollectionBoxAttributes
    result.label = attributes['label']
    return result
}

export const ConstructTable = (attributes: Record<string, string>): CollectionTableAttributes => {
    const result = Construct(attributes) as CollectionTableAttributes
    result.rows = parseInt(attributes['rows'])
    result.columns = parseInt(attributes['columns'])
    return result
}

export const ConstructDefaultTable = (formName: string): CollectionTableAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-table-${Date.now()}`,
        exportable: true,
        tabtype: "",
        style: CollectionStyle.Table,
        rows: 2,
        columns: 2
    }
}

export const ConstructDefaultBox = (formName: string): CollectionBoxAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-box-${Date.now()}`,
        exportable: true,
        tabtype: "",
        style: CollectionStyle.Box,
        label: "Box"
    }
}

export const ConstructDefaultTabs = (formName: string): CollectionAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-tabs-${Date.now()}`,
        exportable: true,
        tabtype: "horizontal",
        style: CollectionStyle.Tabs
    }
}

export const ConstructDefaultTab = (formName: string): CollectionAttributes => {
    return {
        uuid: '',
        visible: true,
        name: `${formName}-Tabblad: ${Date.now()}`,
        exportable: true,
        tabtype: "",
        style: CollectionStyle.Tab
    }
}