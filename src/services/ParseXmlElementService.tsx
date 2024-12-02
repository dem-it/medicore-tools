import FormElement from "../interfaces/FormElement";

class ParseXmlElementService {
    private xmlString: string;
    private index: number;

    constructor(xmlString: string) {
        this.xmlString = xmlString;
        this.index = 0;
    }

    parseXML(): FormElement {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(this.xmlString, "text/xml")
        //check if xmlDoc contains 'parsererror' element
        const parserError = xmlDoc.querySelector('parsererror')
        if(parserError) {
            throw new Error('Error parsing XML')
        }
        return this.parseElement(xmlDoc.documentElement, '', 0)
    }

    private parseElement(element: Element, path: string, elementIndex: number): FormElement {
        const name = element.tagName

        if(path.length > 0)
            path += '.'
        path += `[${elementIndex}]${name}`

        const formElement: FormElement = {
            index: this.index++,
            name: name,
            path: path,
            innerText: element.textContent || undefined,
            attributes: {},
            children: []
        };

        for (const attr of Array.from(element.attributes))
            formElement.attributes![attr.name] = attr.value

        let childIndex = 0
        for (const child of Array.from(element.children))
            formElement.children!.push(this.parseElement(child, path, childIndex++))

        if(formElement.children!.length> 0)
            this.index++

        return formElement
    }
}

export default ParseXmlElementService