import FormElement from "../interfaces/FormElement";

class ConstructXmlService {

    constructXml(formElement: FormElement, skipChildren?: boolean): string {
        const doc = document.implementation.createDocument('', '', null)
        if (skipChildren) {
            const clonedElement = { ...formElement, children: formElement.children }

            const elementsToRemoveContent = [
                "collection",
                "templateform",
                "metadata"
            ]

            if (clonedElement.name === "collection" && clonedElement.attributes["style"] === "tabs") {
                clonedElement.children = (formElement.children?.map((child) => {
                    //clone child and remove children
                    const clonedChild = { ...child, children: [], innerText: "..." }
                    return clonedChild
                }) as FormElement[] | undefined) || []
            }
            else if (elementsToRemoveContent.includes(clonedElement.name)) {
                clonedElement.innerText = "..."
                clonedElement.children = []
            }

            const root = this.constructElement(doc, clonedElement)
            doc.appendChild(root)
        }
        else {
            console.log(formElement)
            const root = this.constructElement(doc, formElement)
            doc.appendChild(root)
        }

        let xmlString = new XMLSerializer().serializeToString(doc)
        return xmlString
    }

    private constructElement(doc: XMLDocument, formElement: FormElement) {
        const element = doc.createElement(formElement.name)

        for (const key in formElement.attributes)
            element.setAttribute(key, formElement.attributes[key])

        const hasChildren = formElement.children && formElement.children.length > 0

        if (hasChildren) {
            for (const child of formElement.children || [])
                element.appendChild(this.constructElement(doc, child))
        }
        else if (formElement.innerText) {
            element.appendChild(doc.createTextNode(formElement.innerText))
        }

        return element
    }
}

export default ConstructXmlService;