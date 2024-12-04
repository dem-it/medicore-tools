import { SxProps } from "@mui/system";
import FormElement from "../interfaces/FormElement";


/**
 * Props for the Form component.
 */
export interface FormProps {
  /**
   * The styling properties to be applied to the component.
   */
  sx: SxProps;
}

export interface XmlElementProps {
    element: FormElement | undefined;
    selectedElementPath: string | undefined;
    setSelectedElementPath: (path: string) => void;
  }
  
export interface ResultXmlElementProps {
  element: FormElement;
  selectedElementPath: string | undefined;
  setSelectedElementPath: (path: string) => void;
}
  
export interface PropertyProps {
  path: string;
  name: string;
  value: string;
}