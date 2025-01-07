import { Button, ButtonProps } from "@mui/material"
import React from 'react'
import { XmlElementProps } from './Interfaces'

const XmlElement: React.FC<XmlElementProps> = (props) => {

    const element = props.element
    if (!element)
        return <></>

    const onButtonClick = (path: string) => {
        props.setSelectedElementPath(path)
    }

    const hasText = element.children?.length === 0
    const elementHtmlStart = <>
        {/* {element.index} - */}
        &lt;
        {element.name}
        {element.attributes && Object.keys(element.attributes).map((attributeKey) => {
            return ` ${attributeKey}="${element.attributes ? element.attributes[attributeKey] : ''}"`;
        })}
        &gt;
    </>
    const elementHtmlEnd = <>
        &lt;/{element.name}&gt;
    </>

    const buttonProps: ButtonProps = {
        size: 'small',
        style: {
            textTransform: 'none'
        },
        variant: props.selectedElementPath === element.path ? 'outlined' : 'text',
        onClick: () => onButtonClick(element.path)
    }

    return (
        <div style={{
            marginLeft: '8px'
        }}
            title={element.path}>

            {hasText && <Button {...buttonProps}>
                {elementHtmlStart}
                {element.innerText}
                {elementHtmlEnd}
            </Button>
            }

            {!hasText && <>
                <Button {...buttonProps}>
                    {elementHtmlStart}
                </Button>

                {element.children?.map((child) => {

                    return <div key={`child-${child.path}`}>
                        <XmlElement
                            selectedElementPath={props.selectedElementPath}
                            element={child}
                            setSelectedElementPath={props.setSelectedElementPath}
                        />
                    </div>
                })}

                <Button {...buttonProps}>
                    {elementHtmlEnd}
                </Button>
            </>
            }
        </div>
    )
}

export default XmlElement;