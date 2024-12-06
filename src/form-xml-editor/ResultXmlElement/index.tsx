import { ResultXmlElementProps } from '../Interfaces';
import CheckboxCollection from './CheckboxCollection';
import Collection from './Collection';
import Date from './Date';
import Dropdown from './Dropdown';
import FixedText from './FixedText';
import RadiobuttonCollection from './RadiobuttonCollection';
import SearchSelect from './SearchSelect';
import TemplateForm from './TemplateForm';

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