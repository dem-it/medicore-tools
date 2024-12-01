import { Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import FormProps from "./FormProps";

function Properties(props: FormProps) {

  const hasSelectedElement = props.selectedElementIndex !== -1;

  return (
    <>
      <Card sx={props.sx}>
        <CardHeader title="Properties" />
        <CardContent>
          <p>Pas de eigenschappen van een element aan</p>
          {hasSelectedElement ? <>
            <p>Element eigenschappen</p>
          <Stack spacing={2} direction='column'>
            <TextField />
            <TextField />
            <TextField />
          </Stack>
          </> : <>
            <p>Selecteer eerst een element om de eigenschappen aan te passen</p>
          </>}
        </CardContent>
      </Card>
    </>
  );
}

export default Properties;
