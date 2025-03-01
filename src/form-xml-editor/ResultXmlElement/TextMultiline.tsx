import { TextField } from "@mui/material"
import React from "react"
import { Construct } from "../Attributes/TextMultilineAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example
    <textarea name="textareafield01" label="Tekstvak (meerdere regels, klein ingesteld)" displayLabel="false" value="" mandatory="false" visible="true" rows="1" exportable="true"/>
    <textarea name="textareafield02" label="Tekstvak (meerdere regels, groot ingesteld)" displayLabel="false" value="" mandatory="false" visible="true" rows="8" exportable="true"/>
    <textarea name="textareafield03" label="Tekstvak met vast vooringestelde waarde(n)" displayLabel="false" value="Anamnese:  Voorgeschiedenis:  Risicotaxatie:  Diagnose:  Beleid:  Conslusie: " mandatory="false" visible="true" rows="1" exportable="true"/>
*/
const TextMultiline: React.FC<ResultXmlElementProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    return <div className={attributes.visible ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        <TextField
            fullWidth
            multiline
            rows={attributes.rows}
            value={attributes.value} />
        <AddDivider path={props.element.path} />
    </div>
}

export default TextMultiline