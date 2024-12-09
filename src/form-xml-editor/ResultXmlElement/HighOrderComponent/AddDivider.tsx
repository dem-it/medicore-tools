import { Autocomplete, Button, Chip, Divider, Stack, TextField } from "@mui/material";
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { useState } from 'react';
import FormElement from "../../../interfaces/FormElement";
import ConstructXmlService from "../../../services/ConstructXmlService";
import FormElementService from "../../../services/FormElementService";
import ParseXmlElementService from "../../../services/ParseXmlElementService";
import { ConstructDefaultCalculation } from "../../Attributes/CalculationAttributes";
import { ConstructDefaultCheckboxCollection } from "../../Attributes/CheckboxCollectionAttributes";
import { ConstructDefaultBox, ConstructDefaultTab, ConstructDefaultTable, ConstructDefaultTabs } from "../../Attributes/CollectionAttributes";
import { ConstructDefaultDate, ConstructDefaultDateTime } from "../../Attributes/DateAttributes";
import { ConstructDefaultDropdown } from "../../Attributes/DropdownAttributes";
import { ConstructDefaultFileUpload, ConstructDefaultImageUpload } from "../../Attributes/FileUploadAttributes";
import { ConstructDefaultFixedText, ConstructDefaultFixedTextFat } from "../../Attributes/FixedTextAttributes";
import { ConstructDefaultInheritance } from "../../Attributes/InheritanceAttributes";
import { ConstructDefaultInterformValue } from "../../Attributes/InterformValueAttributes";
import { ConstructDefaultNumeric } from "../../Attributes/NumericAttributes";
import { ConstructDefaultRadiobuttonCollection } from "../../Attributes/RadiobuttonCollectionAttributes";
import { ConstructDefaultSearchSelect } from "../../Attributes/SearchSelectAttributes";
import { ConstructDefaultText } from "../../Attributes/TextAttributes";
import { ConstructDefaultTextMultiline } from "../../Attributes/TextMultilineAttributes";
import { useFormData } from "../../FormDataContext/FormDataProvider";

interface AddDividerProps {
    path: string
}

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

const GetDefaultProperties = (element: string): Record<string, string> => {
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

        default:
            return {}
    }
}

const AddDivider = (props: AddDividerProps) => {

    const { parsedXmlContent, setParsedXmlContent } = useFormData()

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const [newElement, setNewElement] = useState<string | undefined>(undefined)
    const [properties, setProperties] = useState<Record<string, string>>({})

    const handleClose = () => {
        setAnchorEl(null)
        setNewElement(undefined)
        setProperties({})
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const optionSelected = (value: string) => {
        console.log("Nieuw element: ", value)
        setNewElement(value)
        setProperties(GetDefaultProperties(value))
    }

    const addElement = () => {
        console.log("Element toevoegen")

        const constructService = new ConstructXmlService()
        const service = new FormElementService(parsedXmlContent!)
        const currentElement = service.getByPath(props.path)!

        const formElement: FormElement = {
            index: currentElement.index + 1,
            name: `${newElement!.split('-')[0]}`,
            path: `${props.path}/0`,
            attributes: properties
        }

        if (newElement === "collection-tabs") {
            const childElement: FormElement = {
                index: currentElement.index + 2,
                name: `${newElement!.split('-')[0]}`,
                path: `${props.path}/0`,
                attributes: GetDefaultProperties("tab")
            }
            formElement.children = [
                childElement
            ]
        }

        service.addAfterPath(props.path, formElement)

        //parse the xml content to fix the paths
        const xml = constructService.constructXml(service.formElement)
        const parsedContent = new ParseXmlElementService(xml).parseXML()

        setParsedXmlContent(parsedContent)

        handleClose()
    }

    const options = [

        { value: "fixedtext", label: "Tekst" },
        { value: "fixedtext-fat", label: "Tekst dikgedrukt" },
        { value: "searchselect", label: "Selecteer met zoekfunctie" },
        { value: "dropdown", label: "Dropdown" },
        { value: "radio", label: "Radiobuttons" },
        { value: "checkboxcollection", label: "Checkboxes" },
        { value: "date", label: "Datum" },
        { value: "date-time", label: "Datum en tijd" },
        { value: "fileupload", label: "Bestand uploaden" },
        { value: "imageupload", label: "Afbeelding uploaden" },
        { value: "numeric", label: "Nummer (rekenveld)" },
        { value: "text", label: "Tekstveld" },
        { value: "textarea", label: "Tekstveld (meerdere regels)" },
        { value: "calculation", label: "Berekening" },
        { value: "inheritance", label: "Overerving" },
        { value: "interformvalue", label: "Overerving - interformwaarde" },
        { value: "collection-table", label: "Tabel" },
        { value: "collection-box", label: "Box" },
        { value: "collection-tabs", label: "Tabbladen" },
    ]
    const sortedOptions = options.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0)

    return <>
        <Divider sx={{
            opacity: anchorEl === null ? 0.5 : 1,
            border: anchorEl === null ? '' : "2px solid green"
        }}>
            <Button
                onClick={(event) => setAnchorEl(event.currentTarget)}>

                <Chip sx={{
                    cursor: 'pointer',
                    title: 'Voeg een element toe',
                    height: `15px`,
                    backgroundColor: '#1976d2',
                    color: 'white'
                }}
                    label="+"
                    aria-describedby={id}
                />

            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div style={{
                    padding: '10px',
                    width: '300px',
                    minHeight: '500px',
                }}>
                    <h3>Voeg een element toe</h3>
                    <Stack spacing={2} direction='column'>
                        <Autocomplete
                            fullWidth
                            disablePortal
                            options={sortedOptions}
                            onChange={(_, value) => value && optionSelected(value.value)}
                            renderInput={(params) => <TextField {...params} label="Selecteer" />} />

                        {newElement && <>
                            <h4>Element: {newElement.split('-')[0]}</h4>
                            <Button variant="contained" onClick={addElement}>
                                Voeg toe
                            </Button>
                        </>}
                    </Stack>
                </div>
            </Popover>
        </Divider>
    </>
}

export default AddDivider