import FormElement from "../interfaces/FormElement";

class XMLParserService {

    parseXML(xmlString: string): FormElement {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlString, "text/xml")
        //check if xmlDoc contains 'parsererror' element
        const parserError = xmlDoc.querySelector('parsererror')
        if(parserError) {
            throw new Error('Error parsing XML')
        }
        return this.parseElement(xmlDoc.documentElement, '', 0)
    }

    constructXml(formElement: FormElement): string {
        const doc = document.implementation.createDocument('', '', null)
        const root = this.constructElement(doc, formElement)
        doc.appendChild(root)
        let xmlString = new XMLSerializer().serializeToString(doc)
        xmlString = xmlString.replace(/<(\w+)([^>]*)\/>/g, '<$1$2></$1>')
        return xmlString
    }
    
    private constructElement(doc: XMLDocument, formElement: FormElement) {
        const element = doc.createElement(formElement.name)
        
        for (const key in formElement.properties)
            element.setAttribute(key, formElement.properties[key])
        
        for (const child of formElement.children || [])
            element.appendChild(this.constructElement(doc, child))

        if (formElement.innerText)
            element.appendChild(doc.createTextNode(formElement.innerText))

        return element
    }

    private parseElement(element: Element, path: string, elementIndex: number): FormElement {
        const name = element.tagName

        if(path.length > 0)
            path += '.'
        path += `[${elementIndex}]${name}`

        const formElement: FormElement = {
            name: name,
            path: path,
            innerText: element.textContent || undefined,
            properties: {},
            children: []
        };

        for (const attr of Array.from(element.attributes)) {
            formElement.properties![attr.name] = attr.value
        }

        let index = 0
        for (const child of Array.from(element.children)) {
            formElement.children!.push(this.parseElement(child, path, index++))
        }

        return formElement
    }
}

export default XMLParserService;