import { createContext, useContext, useEffect, useState } from 'react';
import FormElement from '../../interfaces/FormElement';
import ConstructXmlService from '../../services/ConstructXmlService';
import FormDataContextType from './FormDataContextType';
import FormDataProviderProps from './FormDataProviderProps';

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [xmlContent, setXmlContent] = useState<string>('');
  const [parsedXmlContent, setParsedXmlContent] = useState<FormElement | undefined>(undefined)
  const [selectedElementPath, setSelectedElementPath] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (parsedXmlContent === undefined)
      return

    const constructService = new ConstructXmlService()
    const xml = constructService.constructXml(parsedXmlContent)
    setXmlContent(xml)

  }, [parsedXmlContent])

  const deepClone = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
  }

  const value = {
    formData,
    setFormData,
    xmlContent,
    setXmlContent,
    parsedXmlContent,
    //React performs a shallow comparison of state objects, so if the reference to the object doesn't change, the useEffect won't trigger.
    setParsedXmlContent: (newParsedXmlContent: FormElement | undefined) => {
      setParsedXmlContent(deepClone(newParsedXmlContent));
    },
    selectedElementPath,
    setSelectedElementPath,
  }

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  )
};
