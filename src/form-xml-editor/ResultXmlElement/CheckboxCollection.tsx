import { FormControlLabel, FormGroup, Checkbox as MaterialCheckbox } from "@mui/material"
import React from "react"
import { Construct } from "../Attributes/CheckboxCollectionAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example:
<checkboxcollection name="checkboxcollection01" label="Vragenreeks 1 met checkbox" visible="true" exportable="true">
    <checkbox name="checkbox01" label="Checkbox 1" value="0" mandatory="false" visible="true" exportable="true"/>
    <checkbox name="checkbox02" label="Checkbox 2" value="0" mandatory="false" visible="true" exportable="true"/>
    <checkbox name="checkbox03" label="Checkbox 3" value="0" mandatory="false" visible="true" exportable="true"/>
</checkboxcollection>
 */
const CheckboxCollection: React.FC<ResultXmlElementProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    return <div className={attributes.visible ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        <FormGroup>
            {props.element.children?.map((child, index) => <Checkbox key={`checkbox-${attributes.name}-${index}`} {...props} element={child} />)}
        </FormGroup>
        <AddDivider path={props.element.path} />
    </div>
}

function Checkbox(props: ResultXmlElementProps) {

    const label = props.element.attributes['label']
    const visible = props.element.attributes['visible'] === 'true'
    const className = [
        props.selectedElementPath === props.element.path ? 'selected' : 'selectable',
        visible ? '' : 'hidden'
    ]

    return <div className={className.join(' ')}
        onClick={() => props.setSelectedElementPath(props.element.path)}>
        <FormControlLabel control={<MaterialCheckbox />} label={label} />
    </div>
}

export default CheckboxCollection