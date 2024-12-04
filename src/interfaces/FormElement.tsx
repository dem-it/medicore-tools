/**
 * Represents a form element with a specific type, path, and optional properties and children.
 */
interface FormElement {
    /**
     * The index of the form element within the form structure.
     */
    index: number;

    /**
     * The type of the form element (e.g., 'input', 'select', etc.).
     */
    name: string;

    /**
     * The path or location of the form element within the form structure.
     * This is a unique path, so for lists it will be [0], [1], etc.
     */
    path: string;

    /**
     * The text content of the form element.
     * This field is optional and can contain a string value.
     */
    innerText?: string;

    /**
     * Additional properties for the form element.
     * This field is optional and can contain any key-value pairs.
     */
    attributes: Record<string, string>;

    /**
     * Child form elements nested within this form element.
     * This field is optional and can contain an array of FormElement objects.
     */
    children?: FormElement[];
}
  
  export default FormElement