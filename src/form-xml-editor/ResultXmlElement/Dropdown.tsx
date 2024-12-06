import { FormControl, MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from "react"
import { Construct } from "../Attributes/DropdownAttribute"
import { Construct as ConstructOption } from "../Attributes/OptionAttribute"
import { ResultXmlElementProps } from "../Interfaces"

/* Example:
<dropdown name="dropdown" label="Dropdown veld" value="" mandatory="false" visible="true" exportable="true">
    <option name="option1" label="Eigen optie 1" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 2" value="1" visible="true" active="false"/>
    <option name="option1" label="Eigen optie 3" value="1" visible="true" active="false"/>
</dropdown>
 */
const Dropdown = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)
    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    const [childPath, setChildPath] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        const selectedPath = event.target.value as string
        setChildPath(selectedPath)
        props.setSelectedElementPath(selectedPath)
    }

    if (!attributes.visible)
        return <></>

    return <>
        <FormControl fullWidth>
            <div className={className}
                onClick={() => props.setSelectedElementPath(props.element.path)}>
                <b>{attributes.label}</b>
            </div>
            <Select
                id={`dropdown-${props.element.path}`}
                value={childPath}
                label={attributes.label}
                onChange={handleChange}>
                {props.element.children?.map((child, index) => {
                    const childAttributes = ConstructOption(child.attributes)

                    console.log("Child", child.path, childAttributes.label)

                    return <MenuItem key={`dropdown-${child.path}`} value={child.path}>{childAttributes.label}</MenuItem>
                })}
            </Select>
        </FormControl>
    </>
}

export default Dropdown