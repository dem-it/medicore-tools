import { Autocomplete, TextField } from "@mui/material"
import React from "react"
import { Construct as ConstructOption } from "../Attributes/OptionAttributes"
import { Construct } from "../Attributes/SearchSelectAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example:
<searchselect name="searchselect" label="Selecteer met zoekfunctie" value="" mandatory="false" visible="true" exportable="true">
    <option name="option1" label="Eigen optie 1" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 2" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 3" value="1" visible="true" active="false"/>
</searchselect>
 */
const SearchSelect: React.FC<ResultXmlElementProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    const options = props.element.children?.map((child) => {
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
        <AddDivider path={props.element.path} />
    </div>
}

export default SearchSelect