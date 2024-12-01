import { Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FormElement from "../interfaces/FormElement";
import FormProps from "./FormProps";

interface XmlFormProps extends FormProps {
  /**
   * Callback function to update the XML content.
   * @param content - The new XML content.
   */
  setXmlContent: (content: string) => void;
}

function Xml(props: XmlFormProps) {

  const [xml, setXml] = useState(props.xmlContent)

  function xmlFileSelected(e: any) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result
        if (text) {
          setXml(text as string)
          props.setXmlContent(text as string)
        }

        // clean the input file
        e.target.value = null;
      };
      reader.readAsText(file);
    }
  }

  return (
    <>
      <Card sx={props.sx}>
        <CardHeader title="XML" />
        <CardContent>
          <Stack
            direction='row'
            spacing={2}
            sx={{
              marginBottom: '10px'
            }}>
            <span>
              Voeg je XML bestand toe
            </span>
            <input
              type="file"
              accept=".xml"
              onChange={xmlFileSelected}
            />
          </Stack>
          <TextField
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            onBlur={() => props.setXmlContent(xml)}
            multiline={true}
            sx={{ width: '100%' }}
            rows={10}
          />

          <hr />
          <h2>Elements</h2>

          {PrintSingleElement(props.parsedXmlContent as FormElement)}
        </CardContent>
      </Card>
    </>
  );
}

function PrintSingleElement(element: FormElement) {

  if (!element)
    return <></>

  return (
    <div style={{
      marginLeft: '8px'
    }} 
      title={element.path}>
      &lt;
      {element.name}
      {element.properties && Object.keys(element.properties).map((key) => {
        return <span key={`property-${element.path}-${key}`}> {key}="{element.properties ? element.properties[key] : ''}"</span>
      })}
      &gt;

      {element.children?.map((child) => <PrintSingleElement key={`child-${child.path}`} {...child} />)}
      {element.children?.length === 0 && element.innerText}
      &lt;/{element.name}&gt;
    </div>
  )
}

export default Xml;
