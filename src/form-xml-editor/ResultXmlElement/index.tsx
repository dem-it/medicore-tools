import { ResultXmlElementProps } from '../Interfaces';
import CheckboxCollection from './CheckboxCollection';
import Collection from './Collection';
import Date from './Date';
import FixedText from './FixedText';
import TemplateForm from './TemplateForm';

const ResultXmlElement = (props: ResultXmlElementProps) => {

  const element = props.element

  if(element.name === 'templateform')
    return <TemplateForm {...props} />
  if (element.name === 'fixedtext')
    return <FixedText {...props} />
  if (element.name === 'checkboxcollection')
    return <CheckboxCollection {...props} />
  if (element.name === 'date')
    return <Date {...props} />
  if (element.name === 'collection')
    return <Collection {...props} />

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