import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, Card, CardContent, CardHeader, Grid, Stack } from "@mui/material"
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React, { useEffect, useState } from "react"
import XMLViewer from 'react-xml-viewer'
import FormElement from "../interfaces/FormElement"
import ConstructXmlService from '../services/ConstructXmlService'
import FormElementService from "../services/FormElementService"
import ParseXmlElementService from '../services/ParseXmlElementService'
import { GetDefaultProperties } from './Attributes/PropertiesHelper'
import { useFormData } from "./FormDataContext/FormDataProvider"
import { FormProps } from "./Interfaces"
import Property from "./Property"

const Properties: React.FC<FormProps> = (props) => {

  const { formName, selectedElementPath, setSelectedElementPath, parsedXmlContent, setParsedXmlContent } = useFormData()

  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>(undefined)
  const [properties, setProperties] = useState<Record<string, string>>({})
  const [xml, setXml] = useState('')

  const supportedAddElements = [
    { name: 'checkboxcollection', label: 'Voeg optie toe' },
    { name: 'radio', label: 'Voeg optie toe' },
    { name: 'searchselect', label: 'Voeg optie toe' },
    { name: 'dropdown', label: 'Voeg optie toe' },
    { name: 'collection-tabs', label: 'Voeg tab toe' }
  ]

  const getSupportedAddElement = (): { name: string, label: string } | undefined => {

    const supportedAddElement = supportedAddElements.find(x => x.name.split('-')[0] === selectedElement!.name)

    if (supportedAddElement === undefined)
      return undefined

    //check if the elements is collection-tabs and the style is tabs
    if (supportedAddElement.name === 'collection-tabs' && selectedElement!.attributes.style !== 'tabs')
      return undefined

    return supportedAddElement
  }

  const addChildElement = () => {
    const constructService = new ConstructXmlService()
    const service = new FormElementService(parsedXmlContent!)
    const currentElement = service.getByPath(selectedElement!.path)!

    const childElement = getNewChildElement()

    if (childElement === undefined)
      return

    if (currentElement.children === undefined)
      currentElement.children = []
    currentElement.children.push(childElement)

    //parse the xml content to fix the paths
    const xml = constructService.constructXml(service.formElement)
    const parsedContent = new ParseXmlElementService(xml).parseXML()
    setParsedXmlContent(parsedContent)
  }

  const getNewChildElement = (): FormElement | undefined => {
    const childElement: FormElement = {
      index: selectedElement!.index + 1,
      path: `${selectedElement!.path}/0`,
      name: ``,
      attributes: {}
    }

    const supportedAddElement = getSupportedAddElement()!

    switch (supportedAddElement.name) {
      case 'checkboxcollection':
        childElement.name = 'checkbox'
        childElement.attributes = GetDefaultProperties('checkbox', formName)
        break

      case 'radio':
      case 'searchselect':
      case 'dropdown':
        childElement.name = 'option'
        childElement.attributes = GetDefaultProperties('option', formName)
        break

      case 'collection-tabs':
        {
          childElement.name = 'collection'
          childElement.attributes = GetDefaultProperties('tab', formName)

          const subChildElement: FormElement = {
            index: selectedElement!.index + 2,
            name: `fixedtext`,
            path: `${selectedElement!.path}/1`,
            attributes: GetDefaultProperties("fixedtext", formName)
          }
          childElement.children = [
            subChildElement
          ]

          break
        }
      default:
        return undefined
    }

    return childElement
  }

  const deleteElement = () => {
    if (!parsedXmlContent || !selectedElementPath)
      return

    const constructService = new ConstructXmlService()
    const service = new FormElementService(parsedXmlContent)
    service.deleteElement(selectedElementPath)

    //parse the xml content to fix the paths
    const xml = constructService.constructXml(service.formElement)
    const parsedContent = new ParseXmlElementService(xml).parseXML()
    setParsedXmlContent(parsedContent)
    setSelectedElementPath(undefined)
  }

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
            <Stack
              direction='row'
              spacing={2}
              justifyContent='space-between'
            >
              <h3>Eigenschappen</h3>
              <div>

                {getSupportedAddElement() !== undefined && (
                  <Button
                    onClick={addChildElement}
                  >
                    <AddIcon />
                    {getSupportedAddElement()!.label}
                  </Button>
                )}
                <Button onClick={deleteElement}>
                  <DeleteIcon />
                  Verwijder
                </Button>
              </div>
            </Stack>
            <span>Geselecteerd element: <b>{selectedElement.name}</b></span>

            {!hasProperties && <p>Geen eigenschappen gevonden om aan te passen.</p>}

            <Grid container spacing={2}>
              {Object.entries(properties)
                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                .map(([key, value]) => (
                  <Property
                    key={`${selectedElementPath}-${key}`}
                    parentElement={selectedElement}
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
  )
}

export default Properties
