import React from "react"
import { Construct } from "../Attributes/InterformValueAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"

/* Example
    <interformvalue name="read_only_field" label="InterFormValue" displayLabel="true" value="" visible="true" templateFormUuid="99999999" fieldUuid="99999999" exportable="true" />
*/
const InterformValue: React.FC<ResultXmlElementProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    const classNames = [
        props.selectedElementPath === props.element.path ? 'selected' : 'selectable',
        attributes.visible ? '' : 'hidden'
    ]

    return <>
        <div className={classNames.join(' ')}
            onClick={() => props.setSelectedElementPath(props.element.path)}>
            {attributes.label !== '' && <b className={attributes.displayLabel ? '' : 'hidden'}>
                {attributes.label}
            </b>}
            - Inter form value
            - templateFormUuid: {attributes.templateFormUuid}
            - fieldUuid: {attributes.fieldUuid}
        </div>
        <AddDivider path={props.element.path} />
    </>
}

export default InterformValue