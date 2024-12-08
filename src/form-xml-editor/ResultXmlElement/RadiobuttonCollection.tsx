import { FormControl, FormControlLabel, Radio as MaterialRadio, RadioGroup } from "@mui/material"
import { Construct as ConstructOption } from "../Attributes/OptionAttributes"
import { Construct } from "../Attributes/RadiobuttonCollectionAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example:
<radio name="rb_collection" label="Selecteer een optie" value="" mandatory="false" visible="true" exportable="true">
    <option name="optie_1" label="optie 1" value="0" visible="true" active="true"/>
    <option name="optie_1" label="optie 2" value="0" visible="true" active="true"/>
    <option name="optie_1" label="optie 3" value="0" visible="true" active="true"/>
</radio>
 */
const RadiobuttonCollection = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    return <div className={attributes.visible ? '' : 'hidden'}>
        <FormControl fullWidth>
            <HeaderLabel {...props} label={attributes.label} />
            <RadioGroup name={`radio-buttons-group-${props.element.path}`}>
                {props.element.children?.map((child, index) => <Radio key={`radio-${props.element.path}-${index}`} {...props} element={child} />)}
            </RadioGroup>
        </FormControl>
    </div>
}

function Radio(props: ResultXmlElementProps) {

    const attributes = ConstructOption(props.element.attributes)
    
    const classNames = [
        props.selectedElementPath === props.element.path ? 'selected' : 'selectable',
        attributes.visible ? '' : 'hidden'
    ]

    return <div className={classNames.join(' ')}
        onClick={() => props.setSelectedElementPath(props.element.path)}>
        <FormControlLabel control={<MaterialRadio />} label={attributes.label} value={attributes.value} />
    </div>
}

export default RadiobuttonCollection