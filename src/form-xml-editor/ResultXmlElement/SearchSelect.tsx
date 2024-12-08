import { Autocomplete, TextField } from "@mui/material"
import { Construct as ConstructOption } from "../Attributes/OptionAttributes"
import { Construct } from "../Attributes/SearchSelectAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example:
<searchselect name="searchselect" label="Selecteer met zoekfunctie" value="" mandatory="false" visible="true" exportable="true">
    <option name="option1" label="Eigen optie 1" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 2" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 3" value="1" visible="true" active="false"/>
</searchselect>
 */
const SearchSelect = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    const options = props.element.children?.map((child, _) => {
        const childAttributes = ConstructOption(child.attributes)
        return {
            label: childAttributes.label,
            value: child.path
        }
    }) as { label: string, value: string }[]

    return <div className={attributes.visible ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        <Autocomplete
            fullWidth
            disablePortal
            options={options}
            sx={{ width: 300 }}
            onChange={(_, value) => value && props.setSelectedElementPath(value.value)}
            renderInput={(params) => <TextField {...params} label="Selecteer" />} />
    </div>
}

export default SearchSelect