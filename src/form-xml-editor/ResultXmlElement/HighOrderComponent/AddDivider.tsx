import { Autocomplete, Button, Chip, Divider, Skeleton, Stack, TextField } from "@mui/material";
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { useState } from 'react';
import FormElement from "../../../interfaces/FormElement";
import ConstructXmlService from "../../../services/ConstructXmlService";
import FormElementService from "../../../services/FormElementService";
import ParseXmlElementService from "../../../services/ParseXmlElementService";
import { ConstructDefaultCalculation } from "../../Attributes/CalculationAttributes";
import { ConstructDefaultCheckboxCollection } from "../../Attributes/CheckboxCollectionAttributes";
import { ConstructDefaultFixedText, ConstructDefaultFixedTextFat } from "../../Attributes/FixedTextAttributes";
import { useFormData } from "../../FormDataContext/FormDataProvider";
import Property from "../../Property";

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
        case "checkboxes":
            return ConvertToRecord(ConstructDefaultCheckboxCollection())
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
        service.addAfterPath(props.path, formElement)
        
        //parse the xml content to fix the paths
        const xml = constructService.constructXml(service.formElement)
        const parsedContent = new ParseXmlElementService(xml).parseXML()

        setParsedXmlContent(parsedContent)

        //handleClose()
    }

    const options = [
        { value: "fixedtext", label: "Tekst" },
        { value: "fixedtext-fat", label: "Tekst dikgedrukt" },
        // { value: "searchselect", label: "Zoek selectie" },
        // { value: "dropdown", label: "Dropdown" },
        // { value: "radio", label: "Radio" },
        { value: "checkboxes", label: "Checkboxes" },
        // { value: "date", label: "Datum" },
        // { value: "time", label: "Tijd" },
        // { value: "datetime", label: "Datum en tijd" },
        // { value: "number", label: "Nummer" },
        // { value: "email", label: "Email" },
        // { value: "phone", label: "Telefoon" },
        // { value: "url", label: "URL" },
        // { value: "textarea", label: "Tekstveld" },
        // { value: "file", label: "Bestand" },
        // { value: "button", label: "Knop" },
        // { value: "label", label: "Label" },
        { value: "calculation", label: "Berekening" },
        // { value: "inheritance", label: "Overerving" },
        // { value: "interformvalue", label: "Interformwaarde" },
        // { value: "collection", label: "Collectie (tabel/box/tabs)" }
    ]
    const sortedOptions = options.sort((a, b) => {
        if (a.value < b.value) {
          return -1
        }
        if (a.value > b.value) {
          return 1
        }
        return 0
      })

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
                    minHeight: '400px',
                }}>
                    <h3>Voeg een element toe</h3>
                    <Stack spacing={2} direction='column'>
                        <Autocomplete
                            fullWidth
                            disablePortal
                            options={sortedOptions}
                            onChange={(_, value) => value && optionSelected(value.value)}
                            renderInput={(params) => <TextField {...params} label="Selecteer" />} />

                        {newElement ? <>
                            <h4>Element: {newElement.split('-')[0]}</h4>
                            {Object.entries(properties)
                                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                                .map(([key, value]) => (
                                    <Property
                                        key={`new-property-${props.path}-${newElement}-${key}`}
                                        path='niet-van-toepassing'
                                        name={key}
                                        value={value}
                                        skipTriggerChange={true}
                                    />
                                ))}
                            <Button variant="contained" onClick={addElement}>
                                Voeg toe
                            </Button>
                        </> : <>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton variant="rounded" width={200} height={40} />
                            ))}
                        </>}
                    </Stack>
                </div>
            </Popover>
        </Divider>
    </>
}

export default AddDivider