import { Grid, TextField } from "@mui/material";
import { useState } from "react";

interface PropertyProps {
    path: string;
    name: string;
    value: string;
}

function Property(props: PropertyProps) {
    const [name, setName] = useState(props.name)
    const [value, setValue] = useState(props.value)

    const fieldChanged = () => {
        
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
