import React from "react"
import { ResultXmlElementProps } from "../../Interfaces"

interface HeaderLabelProps extends ResultXmlElementProps {
    label?: string,
    labelElement?: JSX.Element
}

const HeaderLabel : React.FC<HeaderLabelProps> = (props) => {

    const className = props.selectedElementPath === props.element.path ? 'selected' : 'selectable'

    return <>
        <div 
            className={`${className} header-label`}
            onClick={() => props.setSelectedElementPath(props.element.path)}>
                {props.label && <b>{props.label}</b>}
                {props.labelElement}
        </div>
    </>
}

export default HeaderLabel