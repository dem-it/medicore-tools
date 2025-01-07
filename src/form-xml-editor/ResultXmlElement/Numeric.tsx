import { TextField } from "@mui/material"
import React from "react"
import { Construct } from "../Attributes/NumericAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example
    <numeric name="VeldLengteA" label="Veld Lengte in meters" displayLabel="true" value="" mandatory="false" visible="true" format="" exportable="true"/>
    <numeric name="VeldGewichtA" label="Veld Gewicht in kg" displayLabel="true" value="" mandatory="false" visible="true" format="" exportable="true"/>
    <numeric name="Numericscore1" label="Score 1" displayLabel="true" value="0" mandatory="false" visible="true" format="" exportable="true"/>
    <numeric name="Numericscore2" label="Score 2" displayLabel="true" value="0" mandatory="false" visible="true" format="" exportable="true"/>				
*/
const Numeric: React.FC<ResultXmlElementProps> = (props) => {

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
        <AddDivider path={props.element.path} />
    </div>
}

export default Numeric