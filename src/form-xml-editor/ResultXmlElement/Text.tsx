import { TextField } from "@mui/material"
import { Construct } from "../Attributes/TextAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example
    <text name="textfield01" label="Simpel input veld (enkele regel)" displayLabel="true" value="" mandatory="false" visible="true" exportable="true"/>
*/
const Text = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)
    
    return <div className={attributes.visible ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        <TextField
            fullWidth
            variant='outlined'
            label={attributes.label}
            value={attributes.value} />
        <AddDivider path={props.element.path} />
    </div>
}

export default Text