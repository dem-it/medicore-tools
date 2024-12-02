import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ButtonProps, Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useEffect, useRef, useState } from "react";
import XMLViewer from 'react-xml-viewer';
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
  const textFieldRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    console.log("XML content changed")
    if (xml !== props.xmlContent)
      setXml(props.xmlContent)
  }, [props.xmlContent])

  // const onBlur = () => {
  //   if (xml !== props.xmlContent)
  //     props.setXmlContent(xml)
  // }

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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              XML Viewer
            </AccordionSummary>
            <AccordionDetails>
              <XMLViewer xml={xml} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              XML Editor
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                disabled={true}
                inputRef={textFieldRef}
                value={xml}
                // onChange={(e) => setXml(e.target.value)}
                // onBlur={onBlur}
                multiline={true}
                sx={{ width: '100%' }}
                rows={10}
              />
            </AccordionDetails>
          </Accordion>

          <h2>Elementen</h2>

          {PrintSingleElement(props.parsedXmlContent as FormElement, props)}
        </CardContent>
      </Card>
    </>
  );
}

function PrintSingleElement(element: FormElement, props: FormProps) {

  if (!element)
    return <></>

  const onButtonClick = (path: string) => {
    console.log("Click", path)
    props.setSelectedElementPath(path)
  }

  const hasText = element.children?.length === 0
  const elementHtmlStart = <>
    {element.index} -
    &lt;
    {element.name}
    {element.attributes && Object.keys(element.attributes).map((key) => {
      return <span style={{ paddingLeft: '2px' }}
        key={`property-${element.path}-${key}`}>
        {key}="{element.attributes ? element.attributes[key] : ''}"
      </span>
    })}
    &gt;
  </>
  const elementHtmlEnd = <>
    &lt;/{element.name}&gt;
  </>

  const buttonProps: ButtonProps = {
    size: 'small',
    style: {
      textTransform: 'none'
    },
    variant: props.selectedElementPath === element.path ? 'outlined' : 'text',
    onClick: () => onButtonClick(element.path)
  }

  return (
    <div style={{
      marginLeft: '8px'
    }}
      title={element.path}>

      {hasText && <Button {...buttonProps}>
        {elementHtmlStart}
        {element.innerText}
        {elementHtmlEnd}
      </Button>
      }

      {!hasText && <>
        <Button {...buttonProps}>
          {elementHtmlStart}
        </Button>

        {element.children?.map((child) => {
          const result = PrintSingleElement(child, props)

          return <div key={`child-${child.path}`}>
            {result}
          </div>
        })}

        <Button {...buttonProps}>
          {elementHtmlEnd}
        </Button>
      </>
      }
    </div>
  )
}

export default Xml;
