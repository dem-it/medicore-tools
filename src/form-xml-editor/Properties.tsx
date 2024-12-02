import { Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import FormElement from "../interfaces/FormElement";
import FormElementService from "../services/FormElementService";
import FormProps from "./FormProps";
import Property from "./Property";

function Properties(props: FormProps) {


  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>(undefined)
  const [properties, setProperties] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!props.selectedElementPath)
      return

    const service = new FormElementService(props.parsedXmlContent!)
    const element = service.getByPath(props.selectedElementPath)

    setProperties(element?.attributes || {})
    setSelectedElement(element)

  }, [props.selectedElementPath])

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

            {hasProperties && <Grid container spacing={2}>
              {Object.entries(properties).map(([key, value]) => (
                <Property key={key}
                  path={props.selectedElementPath!}
                  name={key}
                  value={value}
                />
              ))}
            </Grid>
            }
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default Properties;
