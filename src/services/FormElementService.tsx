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

    deleteElement(path: string) {
        //parent path is the path without the last part
        const parentPath = path.substring(0, path.lastIndexOf('.'))

        const parentElement = this.getByPath(parentPath)
        if (!parentElement || !parentElement.children)
            throw new Error(`Parent element for path ${path} not found`)

        const siblingIndex = parentElement.children.findIndex(child => child.path === path);

        if (siblingIndex === -1)
            throw new Error(`Sibling element with path ${path} not found`)

        parentElement.children.splice(siblingIndex, 1)
    }

    addAfterPath(path: string, element: FormElement) {
        //parent path is the path without the last part
        const parentPath = path.substring(0, path.lastIndexOf('.'))
        
        const parentElement = this.getByPath(parentPath)
        if (!parentElement || !parentElement.children)
            throw new Error(`Parent element for path ${path} not found`)

        const siblingIndex = parentElement.children.findIndex(child => child.path === path);

        if (siblingIndex === -1)
            throw new Error(`Sibling element with path ${path} not found`)

        parentElement.children.splice(siblingIndex + 1, 0, element)
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