import React from "react"
import { Construct } from "../Attributes/FixedTextAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"

/* Example
    <fixedtext name="tekstvb" label="Dit is drikgedukte tekst" displayLabel="true" value="" visible="true" exportable="true"/>
    <fixedtext name="tekstvb2" label="" displayLabel="false" value="Dit is normale tekst" visible="true" exportable="true"/>
*/
const FixedText: React.FC<ResultXmlElementProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    const classNames = [
        props.selectedElementPath === props.element.path ? 'selected' : 'selectable',
        attributes.visible ? '' : 'hidden'
    ]

    return <>
        <div className={classNames.join(' ')}
            onClick={() => props.setSelectedElementPath(props.element.path)}>
            {attributes.displayLabel && <b>{attributes.label.trim() === '' ? '-' : attributes.label}</b>}
            {attributes.value !== '' && <div>{attributes.value}</div>}
        </div>
        <AddDivider path={props.element.path} />
    </>
}

export default FixedText