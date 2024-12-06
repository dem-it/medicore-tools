import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useEffect, useRef, useState } from "react";
import XMLViewer from 'react-xml-viewer';
import ParseXmlElementService from '../services/ParseXmlElementService';
import { useFormData } from './FormDataContext/FormDataProvider';
import { FormProps } from './Interfaces';
import XmlElement from './XmlElement';

function Xml(props: FormProps) {

  const {
    xmlContent,
    parsedXmlContent,
    selectedElementPath,
    setSelectedElementPath,
    setParsedXmlContent
  } = useFormData()
  const [xml, setXml] = useState(xmlContent)
  const textFieldRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (xml === xmlContent)
      return

    setXml(xmlContent)
    // We only need to check if xmlContent is Changed
    // eslint-disable-next-line
  }, [xmlContent])


  function xmlFileSelected(e: any) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result
        if (text) {
          const parsedContent = new ParseXmlElementService(text as string).parseXML()
          setParsedXmlContent(parsedContent)
          setSelectedElementPath("")
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

          {xmlContent && <>
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

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                XML Elementen
              </AccordionSummary>
              <AccordionDetails>
                <XmlElement
                  selectedElementPath={selectedElementPath}
                  element={parsedXmlContent}
                  setSelectedElementPath={setSelectedElementPath}
                />
              </AccordionDetails>
            </Accordion>
          </>}

        </CardContent>
      </Card>
    </>
  );
}

export default Xml;
