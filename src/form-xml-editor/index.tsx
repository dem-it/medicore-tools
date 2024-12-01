import { Grid, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import FormElement from "../interfaces/FormElement";
import XMLParserService from "../services/XmlParserService";
import FormProps from "./FormProps";
import Properties from "./Properties";
import Result from "./Result";
import Xml from "./Xml";

function FormXmlEditor() {
  const [xmlContent, setXmlContent] = useState('')
  const [parsedXmlContent, setParsedXmlContent] = useState<FormElement | undefined>(undefined)
  const [tempXmlContent, setTempXmlContent] = useState('')
  const [selectedElementIndex, setSelectedElementIndex] = useState(-1)

  const xmlParser = useMemo(() => new XMLParserService(), []);

  const formProps: FormProps = {
    sx: {},
    xmlContent,
    parsedXmlContent,
    selectedElementIndex,
    setSelectedElementIndex,
  };

  const hasXml = xmlContent.length > 0;

  useEffect(() => {

    if (tempXmlContent.length === 0)
      return

    try {
      const parsedXml = xmlParser.parseXML(tempXmlContent)
      setParsedXmlContent(parsedXml)
      const xml = xmlParser.constructXml(parsedXml)
      setXmlContent(xml)
    }
    catch {
      setXmlContent(tempXmlContent)
    }

  }, [tempXmlContent, xmlParser])

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
          <Stack spacing={2} direction='column'>
            {hasXml && <Properties {...formProps} />}
            <Xml {...formProps} setXmlContent={setTempXmlContent} />
          </Stack>
        </Grid>
        <Grid item lg={6}>
          {hasXml && (
            <Result {...formProps} sx={{ height: '100%' }} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default FormXmlEditor;
