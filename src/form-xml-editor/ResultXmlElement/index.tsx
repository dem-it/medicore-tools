import { ResultXmlElementProps } from '../Interfaces';
import Calculation from './Calculation';
import CheckboxCollection from './CheckboxCollection';
import Collection from './Collection';
import Date from './Date';
import Dropdown from './Dropdown';
import FileUpload from './FileUpload';
import FixedText from './FixedText';
import Inheritance from './Inheritance';
import InterformValue from './InterformValue';
import Numeric from './Numeric';
import RadiobuttonCollection from './RadiobuttonCollection';
import SearchSelect from './SearchSelect';
import TemplateForm from './TemplateForm';
import Text from './Text';
import TextMultiline from './TextMultiline';

const ResultXmlElement = (props: ResultXmlElementProps) => {

  const element = props.element

  if (element.name === 'templateform')
    return <TemplateForm {...props} />
  if (element.name === 'fixedtext')
    return <FixedText {...props} />
  if (element.name === 'checkboxcollection')
    return <CheckboxCollection {...props} />
  if (element.name === 'date')
    return <Date {...props} />
  if (element.name === 'collection')
    return <Collection {...props} />
  if (element.name === 'radio')
    return <RadiobuttonCollection {...props} />
  if (element.name === 'dropdown')
    return <Dropdown {...props} />
  if (element.name === 'searchselect')
    return <SearchSelect {...props} />
  if (element.name === 'text')
    return <Text {...props} />
  if (element.name === 'textarea')
    return <TextMultiline {...props} />
  if (element.name === 'fileupload')
    return <FileUpload {...props} name='Selecteer bestanden' />
  if (element.name === 'imageupload')
    return <FileUpload {...props} name='Selecteer afbeelding' />
  if (element.name === 'numeric')
    return <Numeric {...props} />
  if (element.name === 'calculation')
    return <Calculation {...props} />
  if (element.name === 'interformvalue')
    return <InterformValue {...props} />
  if (element.name === 'inheritance')
    return <Inheritance {...props} />

  if (element.name === 'metadata')
    return <></>

  const elementsToSkip = [
    'EmrXmlImport'
  ]

  if (!elementsToSkip.includes(element.name))
    console.log(`Element not implemented: '${element.name}'`)

  //do nothing just return te rest of the tree
  return <>
    {element.children?.map((child) => {
      return <ResultXmlElement
        key={`child-${child.path}`}
        {...props}
        element={child}
      />
    })}
  </>
}

export default ResultXmlElement;