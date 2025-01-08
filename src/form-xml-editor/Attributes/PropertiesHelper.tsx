import { ConstructDefaultCalculation } from "./CalculationAttributes"
import { ConstructDefaultCheckbox } from "./CheckboxAttributes"
import { ConstructDefaultCheckboxCollection } from "./CheckboxCollectionAttributes"
import { ConstructDefaultBox, ConstructDefaultTab, ConstructDefaultTable, ConstructDefaultTabs } from "./CollectionAttributes"
import { ConstructDefaultDate, ConstructDefaultDateTime } from "./DateAttributes"
import { ConstructDefaultDropdown } from "./DropdownAttributes"
import { ConstructDefaultFileUpload, ConstructDefaultImageUpload } from "./FileUploadAttributes"
import { ConstructDefaultFixedText, ConstructDefaultFixedTextFat } from "./FixedTextAttributes"
import { ConstructDefaultInheritance } from "./InheritanceAttributes"
import { ConstructDefaultInterformValue } from "./InterformValueAttributes"
import { ConstructDefaultNumeric } from "./NumericAttributes"
import { ConstructDefaultOption } from "./OptionAttributes"
import { ConstructDefaultRadiobuttonCollection } from "./RadiobuttonCollectionAttributes"
import { ConstructDefaultSearchSelect } from "./SearchSelectAttributes"
import { ConstructDefaultText } from "./TextAttributes"
import { ConstructDefaultTextMultiline } from "./TextMultilineAttributes"

const ConvertToRecord = (object: any): Record<string, string> => {
    const properties: Record<string, string> = {}
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            properties[key] = String(object[key])
        }
    }
    
    return properties
}
export const GetDefaultProperties = (element: string, formName: string): Record<string, string> => {
    switch (element) {
        case "fixedtext":
            return ConvertToRecord(ConstructDefaultFixedText(formName))
        case "fixedtext-fat":
            return ConvertToRecord(ConstructDefaultFixedTextFat(formName))
        case "calculation":
            return ConvertToRecord(ConstructDefaultCalculation(formName))
        case "checkboxcollection":
            return ConvertToRecord(ConstructDefaultCheckboxCollection(formName))
        case "collection-table":
            return ConvertToRecord(ConstructDefaultTable(formName))
        case "collection-box":
            return ConvertToRecord(ConstructDefaultBox(formName))
        case "collection-tabs":
            return ConvertToRecord(ConstructDefaultTabs(formName))
        case "date":
            return ConvertToRecord(ConstructDefaultDate(formName))
        case "date-time":
            return ConvertToRecord(ConstructDefaultDateTime(formName))
        case "dropdown":
            return ConvertToRecord(ConstructDefaultDropdown(formName))
        case "radio":
            return ConvertToRecord(ConstructDefaultRadiobuttonCollection(formName))
        case "searchselect":
            return ConvertToRecord(ConstructDefaultSearchSelect(formName))
        case "fileupload":
            return ConvertToRecord(ConstructDefaultFileUpload(formName))
        case "imageupload":
            return ConvertToRecord(ConstructDefaultImageUpload(formName))
        case "inheritance":
            return ConvertToRecord(ConstructDefaultInheritance(formName))
        case "interformvalue":
            return ConvertToRecord(ConstructDefaultInterformValue(formName))
        case "numeric":
            return ConvertToRecord(ConstructDefaultNumeric(formName))
        case "text":
            return ConvertToRecord(ConstructDefaultText(formName))
        case "textarea":
            return ConvertToRecord(ConstructDefaultTextMultiline(formName))
        case "tab":
            return ConvertToRecord(ConstructDefaultTab(formName))
        case "option":
            return ConvertToRecord(ConstructDefaultOption(formName))
        case "checkbox":
            return ConvertToRecord(ConstructDefaultCheckbox(formName))

        default:
            return {}
    }
}