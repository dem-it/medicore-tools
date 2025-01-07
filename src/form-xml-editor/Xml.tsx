import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Card, CardContent, CardHeader } from "@mui/material"
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React, { useEffect, useState } from "react"
import XMLViewer from 'react-xml-viewer'
import { useFormData } from './FormDataContext/FormDataProvider'
import { FormProps } from './Interfaces'
import XmlElement from './XmlElement'

const Xml: React.FC<FormProps> = (props) => {

  const {
    xmlContent,
    parsedXmlContent,
    selectedElementPath,
    setSelectedElementPath,
  } = useFormData()
  const [xml, setXml] = useState(xmlContent)

  useEffect(() => {
    if (xml === xmlContent)
      return

    setXml(xmlContent)
    // We only need to check if xmlContent is Changed
    // eslint-disable-next-line
  }, [xmlContent])



  return (
    <>
      <Card sx={props.sx}>
        <CardHeader title="XML" />
        <CardContent>
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

          {/* <Accordion>
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
          </Accordion> */}

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
        </CardContent>
      </Card>
    </>
  );
}

export default Xml;
