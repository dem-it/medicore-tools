import { Construct } from "../Attributes/InheritanceAttributes"
import { ResultXmlElementProps } from "../Interfaces"

/* Example
    <inheritance name="will_pick_value_from_another_form_only_first_time" label="Inheritance" displayLabel="true" value="" visible="true" templateFormUuid="99999999" fieldUuid="9999999" exportable="true" />
*/
const Inheritance = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    const classNames = [
        props.selectedElementPath === props.element.path ? 'selected' : 'selectable',
        attributes.visible ? '' : 'hidden'
    ]

    return <div className={classNames.join(' ')}
        onClick={() => props.setSelectedElementPath(props.element.path)}>
        {attributes.label !== '' && <b className={attributes.displayLabel ? '' : 'hidden'}>
            {attributes.label}
        </b>}
        - Inter form value
        - templateFormUuid: {attributes.templateFormUuid} 
        - fieldUuid: {attributes.fieldUuid}
    </div>
}

export default Inheritance