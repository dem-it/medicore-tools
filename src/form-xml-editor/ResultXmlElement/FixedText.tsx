import { Construct } from "../Attributes/FixedTextAttributes"
import { ResultXmlElementProps } from "../Interfaces"

/* Example
    <fixedtext name="tekstvb" label="Dit is drikgedukte tekst" displayLabel="true" value="" visible="true" exportable="true"/>
    <fixedtext name="tekstvb2" label="" displayLabel="false" value="Dit is normale tekst" visible="true" exportable="true"/>
*/
const FixedText = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    return <div className={attributes.visible ? '' : 'hidden'}>
        <div className={className}
            onClick={() => props.setSelectedElementPath(props.element.path)}>
            {attributes.label !== '' && <div className={attributes.displayLabel ? '' : 'hidden'}>
                <b>{attributes.label}</b>
            </div>}
            {attributes.value !== '' && <div>{attributes.value}</div>}
        </div>
    </div>
}

export default FixedText