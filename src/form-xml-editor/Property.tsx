import { Grid, Stack, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FormElementService from "../services/FormElementService";
import { useFormData } from "./FormDataContext/FormDataProvider";
import { PropertyProps } from "./Interfaces";

function Property(props: PropertyProps) {

    const { parsedXmlContent, setParsedXmlContent } = useFormData()

    const [previousName, setPreviousName] = useState(props.name)
    const [previousValue, setPreviousValue] = useState(props.value)

    const [name, setName] = useState(props.name)
    const [value, setValue] = useState(props.value)
    const [booleanValue, setBooleanValue] = useState<boolean>(props.value === 'true')

    const booleanNames = ['mandatory', 'visible', 'exportable']
    const isBoolean = booleanNames.includes(name)

    useEffect(() => {
        if (!isBoolean)
            return

        setValue(booleanValue.toString())
        fieldChanged(booleanValue.toString())
    }, [booleanValue])

    const fieldChanged = (newValue: string) => {
        if (!parsedXmlContent)
            return
        if (name === previousName && newValue === previousValue)
            return //nothing changed

        const service = new FormElementService(parsedXmlContent!)
        const formElementToChange = service.getByPath(props.path)

        if (previousName !== name) {
            //the name is changed, remove te attribute
            delete formElementToChange!.attributes[previousName]
            setPreviousName(name)
        }

        setPreviousValue(newValue)
        //the value is changed
        formElementToChange!.attributes[name] = newValue

        setParsedXmlContent(service.formElement)
    }

    return <>
        <Grid item xs={4}>
            <TextField
                size='small'
                label='Naam'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => fieldChanged(value)}
            />
        </Grid>
        <Grid item xs={7}>
            {isBoolean ?
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <span>false</span>
                    <Switch
                        checked={booleanValue}
                        onChange={(e) => setBooleanValue(e.target.checked)} />
                    <span>true</span>
                </Stack>
                :
                <TextField
                    fullWidth
                    size='small'
                    label='Waarde'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => fieldChanged(value)}
                />
            }
        </Grid>
    </>
}

export default Property;
