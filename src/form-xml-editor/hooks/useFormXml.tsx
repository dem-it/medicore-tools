import { useEffect, useMemo, useState } from 'react';
import FormElement from '../../interfaces/FormElement';
import XMLParserService from '../../services/ConstructXmlService';
import ParseXmlElementService from '../../services/ParseXmlElementService';

interface UseFormXmlProps {
  initialXmlContent?: string;
}

const useFormXml = ({ initialXmlContent = '' }: UseFormXmlProps) => {
  const [xmlContent, setXmlContent] = useState(initialXmlContent)
  const [parsedXmlContent, setParsedXmlContent] = useState<FormElement | undefined>(undefined)
  const [selectedElementPath, setSelectedElementPath] = useState<string | undefined>(undefined)

  const xmlParser = useMemo(() => new XMLParserService(), [])

  useEffect(() => {
    if (xmlContent) {
      const parsedContent = new ParseXmlElementService(xmlContent).parseXML()
      setParsedXmlContent(parsedContent)
    }
  }, [xmlContent])

  return {
    xmlContent,
    setXmlContent,
    parsedXmlContent,
    selectedElementPath,
    setSelectedElementPath,
  };
};

export default useFormXml;