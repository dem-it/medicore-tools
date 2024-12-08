import { Grid, Stack } from "@mui/material";
import { FormDataProvider, useFormData } from "./FormDataContext/FormDataProvider";
import InputOutput from "./InputOutput";
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
      <Stack
        spacing={2}
        direction='row'
        sx={{ marginTop: '10px', marginBottom: '10px' }}>
        <h1>Form XML Editor</h1>
        <InputOutput {...formProps} />
      </Stack>

      {hasXml && <>
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
              <Properties {...formProps} />
              <Xml {...formProps} />
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Result sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </>}
    </>
  );
}

export default FormXmlEditor;
