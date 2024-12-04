import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import FormElementService from "../services/FormElementService";
import { useFormData } from "./FormDataContext/FormDataProvider";
import { PropertyProps } from "./Interfaces";

function Property(props: PropertyProps) {

    const { parsedXmlContent, setParsedXmlContent } = useFormData()

    const [previousName, setPreviousName ] = useState(props.name)

    const [name, setName] = useState(props.name)
    const [value, setValue] = useState(props.value)

    const fieldChanged = () => {
        if (!parsedXmlContent)
            return
        if(name === props.name && value === props.value)
            return //nothing changed

        const service = new FormElementService(parsedXmlContent!)
        const formElementToChange = service.getByPath(props.path)

        if(props.name !== name)
        {
            //the name is changed, remove te attribute
            delete formElementToChange!.attributes[previousName]
            setPreviousName(name)
        }

        //the value is changed
        formElementToChange!.attributes[name] = value
        
        setParsedXmlContent(service.formElement)
    }

    return <>
        <Grid item xs={4}>
            <TextField
                size='small'
                label='Naam'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={fieldChanged}
            />
        </Grid>
        <Grid item xs={7}>
            <TextField
                fullWidth
                size='small'
                label='Waarde'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={fieldChanged}
            />
        </Grid>
    </>
}

export default Property;
