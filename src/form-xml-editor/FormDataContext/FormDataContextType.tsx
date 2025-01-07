import FormElement from '../../interfaces/FormElement'

interface FormDataContextType {
    xmlContent: string;
    setXmlContent: (content: string) => void;

    formName: string;
    formData: { [key: string]: any }; // Or define a specific shape for the form data
    setFormData: (data: { [key: string]: any }) => void;
    
    parsedXmlContent: FormElement | undefined;
    setParsedXmlContent: (content: FormElement) => void;

    selectedElementPath: string | undefined;
    setSelectedElementPath: (path: string | undefined) => void;
  }

  export default FormDataContextType