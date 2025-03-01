import { FormControl, MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { useState } from "react"
import { Construct } from "../Attributes/DropdownAttributes"
import { Construct as ConstructOption } from "../Attributes/OptionAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example:
<dropdown name="dropdown" label="Dropdown veld" value="" mandatory="false" visible="true" exportable="true">
    <option name="option1" label="Eigen optie 1" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 2" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 3" value="1" visible="true" active="false"/>
</dropdown>
 */
const Dropdown: React.FC<ResultXmlElementProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    const [childPath, setChildPath] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        const selectedPath = event.target.value as string
        setChildPath(selectedPath)
        props.setSelectedElementPath(selectedPath)
    }

    return <div className={attributes.visible ? '' : 'hidden'}>
        <FormControl fullWidth>
            <HeaderLabel {...props} label={attributes.label} />
            <Select
                id={`dropdown-${props.element.path}`}
                value={childPath}
                label={attributes.label}
                onChange={handleChange}>
                {props.element.children?.map((child) => {
                    const childAttributes = ConstructOption(child.attributes)
                    return <MenuItem key={`dropdown-${child.path}`} value={child.path}>{childAttributes.label}</MenuItem>
                })}
            </Select>
        </FormControl>
        <AddDivider path={props.element.path} />
    </div>
}

export default Dropdown