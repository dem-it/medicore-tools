import { Stack } from "@mui/material"
import { Construct } from "../Attributes/DateAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example
    <date name="datefield01" label="Datum veld" value="2016-01-01" mandatory="false" visible="true" buttonlabel="Button Label" buttonactive="false" dateformat="DATE" exportable="true"/>
    <date name="datetimefield01" label="Datum/tijd veld" value="2016-01-01 08:45" mandatory="false" visible="true" buttonlabel="" buttonactive="true" dateformat="DATE_TIME" exportable="true"/>
*/
const Date = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    const formatIsDate = attributes.dateformat === 'DATE'
    const formatIsDateTime = attributes.dateformat === 'DATE_TIME'

    return <div className={attributes.visible ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        <Stack spacing={2} direction='row'>
            {formatIsDate && <input type="date" value={attributes.value} style={{ width: '100%' }} />}
            {formatIsDateTime && <input type="datetime-local" value={attributes.value} style={{ width: '100%' }} />}
            {attributes.buttonactive && <button style={{ width: '100%' }}>{attributes.buttonlabel}</button>}
        </Stack>
    </div>
}

export default Date