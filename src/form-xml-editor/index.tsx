import { Grid, Stack } from "@mui/material";
import { FormDataProvider, useFormData } from "./FormDataContext/FormDataProvider";
import { FormProps } from "./Interfaces";
import Properties from "./Properties";
import Result from "./Result";
import Xml from "./Xml";

function FormXmlEditor() {

  return <FormDataProvider>
    <FormXmlEditorWithContext />
  </FormDataProvider>
}

function FormXmlEditorWithContext() {

  const {
    xmlContent
  } = useFormData();

  const formProps: FormProps = {
    sx: {}
  }

  const hasXml = xmlContent.length > 0

  return (
    <>
      <h1>Form XML Editor</h1>

      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          height: 'calc(100vh - 64px)',
          marginBottom: '40px'
        }}
      >
        <Grid item lg={6}>
          <Stack spacing={2} direction='column' sx={{ position: 'sticky', top: 0 }}>
            {hasXml && <Properties {...formProps} />}
            <Xml {...formProps} />
          </Stack>
        </Grid>
        <Grid item lg={6}>
          {hasXml && (
            <Result sx={{ height: '100%' }} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default FormXmlEditor;
