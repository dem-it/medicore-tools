import { Construct } from "../Attributes/CalculationAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

/* Example
    <calculation name="resultaat BMI Standaard" label="BMI standaard" displayLabel="true" value="" visible="true" formula="{VeldGewichtA}/({VeldLengteA}*{VeldLengteA})" decimals="2" rounding="standard" exportable="true"/>
    <calculation name="Resultaat_1" label="Score 1 plus 2" displayLabel="true" value="" visible="true" formula="{Numericscore1}+{Numericscore2}" decimals="2" rounding="standard" exportable="true"/>
    <calculation name="Resultaat_2" label="Score 1 x 2" displayLabel="true" value="" visible="true" formula="{Numericscore1}*{Numericscore2}" decimals="2" rounding="standard" exportable="true"/>
    <calculation name="Resultaat_3" label="Score 1 gedeeld 2" displayLabel="true" value="" visible="true" formula="{Numericscore1}/{Numericscore2}" decimals="2" rounding="standard" exportable="true"/>
    <calculation name="Resultaat_4" label="Score 1 min 2" displayLabel="true" value="" visible="true" formula="{Numericscore1}-{Numericscore2}" decimals="2" rounding="standard" exportable="true"/>
*/
const Calculation = (props: ResultXmlElementProps) => {

    const attributes = Construct(props.element.attributes)

    return <div className={attributes.visible ? '' : 'hidden'}>
        <div className={attributes.displayLabel ? '' : 'hidden'}>
            <HeaderLabel {...props} label={attributes.label} />
        </div>
        <div>
            <span>Formula: {attributes.formula}</span>
        </div>
    </div>
}

export default Calculation