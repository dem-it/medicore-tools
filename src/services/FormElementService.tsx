import FormElement from "../interfaces/FormElement";

class FormElementService  
{
    public formElement: FormElement;

    constructor(formElement: FormElement) {
        this.formElement = formElement;
    }

    getByPath(path: string): FormElement | undefined {
        return this.getByPathRecursive(this.formElement, path)
    }

    getByPathRecursive(element: FormElement, path: string): FormElement | undefined {
        //loop through the elements and return the element with the matching path
        if (element.path === path) {
            return element;
        }
        
        //if the element has children, loop through the children
        if (element.children) {
            for (const child of element.children) {
                const childResult = this.getByPathRecursive(child, path)
                if(childResult)
                    return childResult
            }
        }

        return undefined
    }
}

export default FormElementService;