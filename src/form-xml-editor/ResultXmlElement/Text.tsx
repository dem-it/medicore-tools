import { TextField } from "@mui/material"
import { Construct } from "../Attributes/TextAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import HeaderLabel from "./HeaderLabel"

/* Example
    <text name="textfield01" label="Simpel input veld (enkele regel)" displayLabel="true" value="" mandatory="false" visible="true" exportable="true"/>
*/
const Text = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)
    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    if (!attributes.visible)
        return <></>

    return <>
        <HeaderLabel {...props} label={attributes.label} />
        <TextField
            fullWidth
            variant='outlined'
            label={attributes.label}
            value={attributes.value} />
    </>
}

export default Text