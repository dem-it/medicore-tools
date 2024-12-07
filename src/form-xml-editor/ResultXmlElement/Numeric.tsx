import { TextField } from "@mui/material"
import { Construct } from "../Attributes/NumericAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import HeaderLabel from "./HeaderLabel"

/* Example
    <numeric name="VeldLengteA" label="Veld Lengte in meters" displayLabel="true" value="" mandatory="false" visible="true" format="" exportable="true"/>
    <numeric name="VeldGewichtA" label="Veld Gewicht in kg" displayLabel="true" value="" mandatory="false" visible="true" format="" exportable="true"/>
    <numeric name="Numericscore1" label="Score 1" displayLabel="true" value="0" mandatory="false" visible="true" format="" exportable="true"/>
    <numeric name="Numericscore2" label="Score 2" displayLabel="true" value="0" mandatory="false" visible="true" format="" exportable="true"/>				
*/
const Numeric = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    return <div className={attributes.visible ? '' : 'hidden'}>
        <div className={attributes.displayLabel ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        </div>
        <TextField
            fullWidth
            variant='outlined'
            value={attributes.value}
            size="small"
            type='number' />
    </div>
}

export default Numeric