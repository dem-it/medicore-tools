import FormElement from "../interfaces/FormElement";

class ConstructXmlService {

    constructXml(formElement: FormElement): string {
        const doc = document.implementation.createDocument('', '', null)
        const root = this.constructElement(doc, formElement)
        doc.appendChild(root)
        let xmlString = new XMLSerializer().serializeToString(doc)
        return xmlString
    }

    private constructElement(doc: XMLDocument, formElement: FormElement) {
        const element = doc.createElement(formElement.name)
        
        for (const key in formElement.attributes)
            element.setAttribute(key, formElement.attributes[key])
        
        for (const child of formElement.children || [])
            element.appendChild(this.constructElement(doc, child))

        if (formElement.innerText)
            element.appendChild(doc.createTextNode(formElement.innerText))

        return element
    }
}

export default ConstructXmlService;