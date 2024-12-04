import ResultXmlElement from "."
import { Construct } from "../Attributes/TemplateFormAttributes"
import { ResultXmlElementProps } from "../Interfaces"

/* Example:
	<templateform name="_EMR Formulier functies" employeeId="57" active="true" lockTime="123456789" category="5" emrType="68" isQuestionnaireEnabled="false" exportable="true" isPartOfCareplan="false">
 */
const TemplateForm = (props: ResultXmlElementProps ) => {    

    const attributes = Construct(props.element.attributes)

    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    return <>
        <div className={className}
             style={{ fontSize: '1.5em' }}
             onClick={() => props.setSelectedElementPath(props.element.path)}>
            {attributes.name}
        </div>
        
        {props.element.children?.map((child, index) => <ResultXmlElement key={`templateform-child-${index}`} {...props} element={child}  />)}
    </>
}

export default TemplateForm