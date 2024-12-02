import { SxProps } from "@mui/system";
import FormElement from "../interfaces/FormElement";

/**
 * Props for the Form component.
 */
interface FormProps {
    /**
     * The styling properties to be applied to the component.
     */
    sx: SxProps;
    
    /**
     * The XML content to be displayed and edited in the form.
     */
    xmlContent: string;

    parsedXmlContent: FormElement | undefined;

    selectedElementPath: string | undefined;
    setSelectedElementPath: (path: string) => void;

}

export default FormProps