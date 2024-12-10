import { Grid, Stack, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FormElementService from "../services/FormElementService";
import { useFormData } from "./FormDataContext/FormDataProvider";
import { PropertyProps } from "./Interfaces";

function Property(props: PropertyProps) {

    const { parsedXmlContent, setParsedXmlContent } = useFormData()

    const [previousValue, setPreviousValue] = useState(props.value)

    const [value, setValue] = useState(props.value)
    const [booleanValue, setBooleanValue] = useState<boolean>(props.value === 'true')

    const booleanNames = [
        'mandatory',
        'visible',
        'exportable',
        'displayLabel',
        'buttonactive',
        'active'
    ]
    const isBoolean = booleanNames.includes(props.name)

    useEffect(() => {
        if (!isBoolean)
            return

        setValue(booleanValue.toString())
        fieldChanged(booleanValue.toString())
    }, [booleanValue])

    const fieldChanged = (newValue: string) => {
        if (props.skipTriggerChange === true)
            return
        if (!parsedXmlContent)
            return
        if (newValue === previousValue)
            return //nothing changed

        const service = new FormElementService(parsedXmlContent!)
        const formElementToChange = service.getByPath(props.path)

        setPreviousValue(newValue)
        //the value is changed
        formElementToChange!.attributes[props.name] = newValue

        setParsedXmlContent(service.formElement)
    }

    const isTextArea = props.parentElement.name === 'textarea' && props.name === 'value'

    return <>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <b>{props.name}</b>
        </Grid>
        <Grid item xs={8}>
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
                    multiline={isTextArea}
                    rows={isTextArea ? 8 : undefined}
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
