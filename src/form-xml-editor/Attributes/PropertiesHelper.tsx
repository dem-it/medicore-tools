import { ConstructDefaultCalculation } from "./CalculationAttributes";
import { ConstructDefaultCheckbox } from "./CheckboxAttributes";
import { ConstructDefaultCheckboxCollection } from "./CheckboxCollectionAttributes";
import { ConstructDefaultBox, ConstructDefaultTab, ConstructDefaultTable, ConstructDefaultTabs } from "./CollectionAttributes";
import { ConstructDefaultDate, ConstructDefaultDateTime } from "./DateAttributes";
import { ConstructDefaultDropdown } from "./DropdownAttributes";
import { ConstructDefaultFileUpload, ConstructDefaultImageUpload } from "./FileUploadAttributes";
import { ConstructDefaultFixedText, ConstructDefaultFixedTextFat } from "./FixedTextAttributes";
import { ConstructDefaultInheritance } from "./InheritanceAttributes";
import { ConstructDefaultInterformValue } from "./InterformValueAttributes";
import { ConstructDefaultNumeric } from "./NumericAttributes";
import { ConstructDefaultOption } from "./OptionAttributes";
import { ConstructDefaultRadiobuttonCollection } from "./RadiobuttonCollectionAttributes";
import { ConstructDefaultSearchSelect } from "./SearchSelectAttributes";
import { ConstructDefaultText } from "./TextAttributes";
import { ConstructDefaultTextMultiline } from "./TextMultilineAttributes";

const ConvertToRecord = (object: any): Record<string, string> => {
    const properties: Record<string, string> = {};
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            properties[key] = String(object[key]);
        }
    }
    console.log("Properties", properties)
    return properties;
}
export const GetDefaultProperties = (element: string): Record<string, string> => {
    switch (element) {
        case "fixedtext":
            return ConvertToRecord(ConstructDefaultFixedText())
        case "fixedtext-fat":
            return ConvertToRecord(ConstructDefaultFixedTextFat())
        case "calculation":
            return ConvertToRecord(ConstructDefaultCalculation())
        case "checkboxcollection":
            return ConvertToRecord(ConstructDefaultCheckboxCollection())
        case "collection-table":
            return ConvertToRecord(ConstructDefaultTable())
        case "collection-box":
            return ConvertToRecord(ConstructDefaultBox())
        case "collection-tabs":
            return ConvertToRecord(ConstructDefaultTabs())
        case "date":
            return ConvertToRecord(ConstructDefaultDate())
        case "date-time":
            return ConvertToRecord(ConstructDefaultDateTime())
        case "dropdown":
            return ConvertToRecord(ConstructDefaultDropdown())
        case "radio":
            return ConvertToRecord(ConstructDefaultRadiobuttonCollection())
        case "searchselect":
            return ConvertToRecord(ConstructDefaultSearchSelect())
        case "fileupload":
            return ConvertToRecord(ConstructDefaultFileUpload())
        case "imageupload":
            return ConvertToRecord(ConstructDefaultImageUpload())
        case "inheritance":
            return ConvertToRecord(ConstructDefaultInheritance())
        case "interformvalue":
            return ConvertToRecord(ConstructDefaultInterformValue())
        case "numeric":
            return ConvertToRecord(ConstructDefaultNumeric())
        case "text":
            return ConvertToRecord(ConstructDefaultText())
        case "textarea":
            return ConvertToRecord(ConstructDefaultTextMultiline())
        case "tab":
            return ConvertToRecord(ConstructDefaultTab())
        case "option":
            return ConvertToRecord(ConstructDefaultOption())
        case "checkbox": 
            return ConvertToRecord(ConstructDefaultCheckbox())

        default:
            return {}
    }
}