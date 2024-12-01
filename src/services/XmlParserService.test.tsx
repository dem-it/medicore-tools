import FormElement from '../interfaces/FormElement';
import XMLParserService from './XmlParserService';

describe('XMLParserService', () => {
  let xmlParserService: XMLParserService;

  beforeEach(() => {
    xmlParserService = new XMLParserService();
  });

  test('should parse and construct XML correctly', () => {
    const xmlString = '<xml></xml>';
    const parsedElement: FormElement = xmlParserService.parseXML(xmlString);
    const constructedXmlString = xmlParserService.constructXml(parsedElement);
    expect(constructedXmlString).toBe(xmlString);
  });

  test('should parse and construct XML correctly with attributes', () => {
    const xmlString = '<xml attribute="temp"></xml>';
    const parsedElement: FormElement = xmlParserService.parseXML(xmlString);
    const constructedXmlString = xmlParserService.constructXml(parsedElement);
    expect(constructedXmlString).toBe(xmlString);
  });
  
  test('should parse and construct XML correctly with value text', () => {
    const xmlString = '<xml>inner text</xml>';
    const parsedElement: FormElement = xmlParserService.parseXML(xmlString);
    const constructedXmlString = xmlParserService.constructXml(parsedElement);
    expect(constructedXmlString).toBe(xmlString);
  });

  test('should throw an error for invalid XML', () => {
    const invalidXmlString = '<xml>';
    expect(() => {
      xmlParserService.parseXML(invalidXmlString);
    }).toThrow('Error parsing XML');
  });
});