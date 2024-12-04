import { FormControlLabel, FormGroup, Checkbox as MaterialCheckbox } from "@mui/material"
import { Construct } from "../Attributes/CheckboxCollectionAttributes"
import { ResultXmlElementProps } from "../Interfaces"

/* Example:
<checkboxcollection name="checkboxcollection01" label="Vragenreeks 1 met checkbox" visible="true" exportable="true">
    <checkbox name="checkbox01" label="Checkbox 1" value="0" mandatory="false" visible="true" exportable="true"/>
    <checkbox name="checkbox02" label="Checkbox 2" value="0" mandatory="false" visible="true" exportable="true"/>
    <checkbox name="checkbox03" label="Checkbox 3" value="0" mandatory="false" visible="true" exportable="true"/>
</checkboxcollection>
 */
const CheckboxCollection = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)
    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    if (!attributes.visible)
        return <></>

    return <>
        <div className={className}
            onClick={() => props.setSelectedElementPath(props.element.path)}>
            <b>{attributes.label}</b>
        </div>
        <FormGroup>
            {props.element.children?.map((child, index) => <Checkbox key={`checkbox-${attributes.name}-${index}`} {...props} element={child} />)}
        </FormGroup>
    </>
}

function Checkbox(props: ResultXmlElementProps) {

    const label = props.element.attributes['label']
    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    return <div className={className}
        onClick={() => props.setSelectedElementPath(props.element.path)}>
        <FormControlLabel control={<MaterialCheckbox />} label={label} />
    </div>
}

export default CheckboxCollection