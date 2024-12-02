import FormElement from '../interfaces/FormElement';
import ConstructXmlService from './ConstructXmlService';
import ParseXmlElementService from './ParseXmlElementService';

describe('ConstructXmlService', () => {
  let constructService: ConstructXmlService;

  beforeEach(() => {
    constructService = new ConstructXmlService()
  })

  test('should parse and construct XML correctly', () => {
    const xmlString = '<xml></xml>'
    const parsedElement: FormElement = new ParseXmlElementService(xmlString).parseXML()
    const constructedXmlString = constructService.constructXml(parsedElement)
    expect(constructedXmlString).toBe(xmlString)
  });

  test('should parse and construct XML correctly with attributes', () => {
    const xmlString = '<xml attribute="temp"></xml>'
    const parsedElement: FormElement = new ParseXmlElementService(xmlString).parseXML()
    const constructedXmlString = constructService.constructXml(parsedElement)
    expect(constructedXmlString).toBe(xmlString)
  });
  
  test('should parse and construct XML correctly with value text', () => {
    const xmlString = '<xml>inner text</xml>'
    const parsedElement: FormElement = new ParseXmlElementService(xmlString).parseXML()
    const constructedXmlString = constructService.constructXml(parsedElement)
    expect(constructedXmlString).toBe(xmlString)
  });

  test('should throw an error for invalid XML', () => {
    const invalidXmlString = '<xml>';
    expect(() => {
      new ParseXmlElementService(invalidXmlString).parseXML()
    }).toThrow('Error parsing XML');
  });
});