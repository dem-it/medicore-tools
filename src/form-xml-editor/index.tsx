import { Grid, Stack } from "@mui/material"
import React from 'react'
import { FormDataProvider, useFormData } from "./FormDataContext/FormDataProvider"
import InputOutput from "./InputOutput"
import { FormProps } from "./Interfaces"
import Properties from "./Properties"
import Result from "./Result"
import Xml from "./Xml"

const FormXmlEditor = () => {

  return <FormDataProvider>
    <FormXmlEditorWithContext />
  </FormDataProvider>
}

function FormXmlEditorWithContext() {

  const {
    xmlContent
  } = useFormData()

  const formProps: FormProps = {
    sx: {}
  }

  const hasXml = xmlContent.length > 0

  return (
    <React.Fragment>
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
          <Grid item lg={5}>
            <Stack spacing={2} direction='column' sx={{ position: 'sticky', top: 0 }}>
              <Properties {...formProps} />
              <Xml {...formProps} />
            </Stack>
          </Grid>
          <Grid item lg={7}>
            <Result sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </>}
    </React.Fragment>
  );
}

export default FormXmlEditor;
