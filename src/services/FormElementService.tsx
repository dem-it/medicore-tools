import FormElement from "../interfaces/FormElement";

class FormElementService  
{
    private formElement: FormElement;

    constructor(formElement: FormElement) {
        this.formElement = formElement;
    }

    getAllUnnestedElements(): FormElement[] {
        return this.getUnnestedElementsRecursive(this.formElement)
    }

    private getUnnestedElementsRecursive(element: FormElement): FormElement[] {
        const unnestedElements: FormElement[] = []

        unnestedElements.push(element)

        if (element.children) {
            for (const child of element.children) {
                unnestedElements.push(...this.getUnnestedElementsRecursive(child))
            }
        }

        return unnestedElements
    }

    getByPath(path: string): FormElement | undefined {
        return this.getAllUnnestedElements().find((element) => element.path === path)
    }
}

export default FormElementService;