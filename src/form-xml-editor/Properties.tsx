import { Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import FormElement from "../interfaces/FormElement";
import FormElementService from "../services/FormElementService";
import { useFormData } from "./FormDataContext/FormDataProvider";
import { FormProps } from "./Interfaces";
import Property from "./Property";

function Properties(props: FormProps) {

  const { selectedElementPath, parsedXmlContent } = useFormData()

  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>(undefined)
  const [properties, setProperties] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!selectedElementPath)
    {
      setSelectedElement(undefined)
    } 
    else
    {
      const service = new FormElementService(parsedXmlContent!)
      const element = service.getByPath(selectedElementPath)
      setSelectedElement(element)
    }
    
    setProperties({})
    
    // Only want to check if the selectedElementPath is Changed
    // eslint-disable-next-line
  }, [selectedElementPath])

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
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default Properties;
