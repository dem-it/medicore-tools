import { FormControl, FormControlLabel, FormLabel, Radio as MaterialRadio, RadioGroup } from "@mui/material"
import { Construct as ConstructOption } from "../Attributes/OptionAttribute"
import { Construct } from "../Attributes/RadiobuttonCollectionAttribute"
import { ResultXmlElementProps } from "../Interfaces"

/* Example:
<radio name="rb_collection" label="Selecteer een optie" value="" mandatory="false" visible="true" exportable="true">
    <option name="optie_1" label="optie 1" value="0" visible="true" active="true"/>
    <option name="optie_1" label="optie 2" value="0" visible="true" active="true"/>
    <option name="optie_1" label="optie 3" value="0" visible="true" active="true"/>
</radio>
 */
const RadiobuttonCollection = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)
    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    if (!attributes.visible)
        return <></>

    return <>
        <FormControl>
            <div className={className}
                onClick={() => props.setSelectedElementPath(props.element.path)}>
                <FormLabel id={`radio-buttons-group-label-${props.element.path}`}>
                    <b>{attributes.label}</b>
                </FormLabel>
            </div>
            <RadioGroup name={`radio-buttons-group-${props.element.path}`}>
                {props.element.children?.map((child, index) => <Radio key={`radio-${props.element.path}-${index}`} {...props} element={child} />)}
            </RadioGroup>
        </FormControl>
    </>
}

function Radio(props: ResultXmlElementProps) {

    const attributes = ConstructOption(props.element.attributes)
    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    if (!attributes.visible)
        return <></>

    return <div className={className}
        onClick={() => props.setSelectedElementPath(props.element.path)}>
        <FormControlLabel control={<MaterialRadio />} label={attributes.label} value={attributes.value} />
    </div>
}

export default RadiobuttonCollection