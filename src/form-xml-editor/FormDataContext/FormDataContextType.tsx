import FormElement from '../../interfaces/FormElement';

interface FormDataContextType {
    xmlContent: string;
    setXmlContent: (content: string) => void;
    formData: { [key: string]: any }; // Or define a specific shape for the form data
    setFormData: (data: { [key: string]: any }) => void;
    
    parsedXmlContent: FormElement | undefined;
    setParsedXmlContent: (content: FormElement) => void;

    selectedElementPath: string | undefined;
    setSelectedElementPath: (path: string) => void;
  }

  export default FormDataContextType