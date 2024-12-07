import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useEffect, useState } from "react";
import XMLViewer from 'react-xml-viewer';
import FormElement from "../interfaces/FormElement";
import ConstructXmlService from '../services/ConstructXmlService';
import FormElementService from "../services/FormElementService";
import { useFormData } from "./FormDataContext/FormDataProvider";
import { FormProps } from "./Interfaces";
import Property from "./Property";

function Properties(props: FormProps) {

  const { selectedElementPath, parsedXmlContent } = useFormData()

  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>(undefined)
  const [properties, setProperties] = useState<Record<string, string>>({})
  const [xml, setXml] = useState('')

  useEffect(() => {
    if (!selectedElementPath) {
      setSelectedElement(undefined)
    }
    else {
      const service = new FormElementService(parsedXmlContent!)
      const element = service.getByPath(selectedElementPath)
      setSelectedElement(element)
    }

    setProperties({})

    // Only want to check if the selectedElementPath is Changed
    // eslint-disable-next-line
  }, [selectedElementPath])

  useEffect(() => {
    if (!selectedElement)
      return

    const newXml = new ConstructXmlService().constructXml(selectedElement!, true)
    setXml(newXml)

    // Only want to check if the properties are Changed
    // eslint-disable-next-line
  }, [selectedElement])

  useEffect(() => {
    if (!parsedXmlContent || !selectedElementPath)
      return

    // The properties seems to be updated, therefore rerender the xml by the parsedContent
    const service = new FormElementService(parsedXmlContent!)
    const element = service.getByPath(selectedElementPath!)

    if (!element)
      return

    const newXml = new ConstructXmlService().constructXml(element!, true)
    setXml(newXml)

    // Only want to check if the properties are Changed
    // eslint-disable-next-line
  }, [parsedXmlContent])

  useEffect(() => {
    if (!selectedElementPath)
      return

    const service = new FormElementService(parsedXmlContent!)
    const element = service.getByPath(selectedElementPath)
    setProperties(element?.attributes || {})

    // Only want to check if the properties are Changed
    // eslint-disable-next-line
  }, [properties])

  if (selectedElement === undefined)
    return <></>

  const hasProperties = Object.keys(properties).length > 0

  return (
    <>
      <Card sx={props.sx}>
        <CardHeader title="Properties" />
        <CardContent>
          <Stack spacing={2} direction='column'>

            <h3>Eigenschappen</h3>
            <span>Geselecteerd element: <b>{selectedElement.name}</b></span>

            {!hasProperties && <p>Geen eigenschappen gevonden om aan te passen.</p>}

            <Grid container spacing={2}>
              {Object.entries(properties)
                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                .map(([key, value]) => (
                  <Property
                    key={`${selectedElementPath}-${key}`}
                    path={selectedElementPath!}
                    name={key}
                    value={value}
                  />
                ))}
            </Grid>


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
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default Properties;
