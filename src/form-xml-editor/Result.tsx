import { Card, CardContent, CardHeader } from "@mui/material";
import { useFormData } from "./FormDataContext/FormDataProvider";
import { FormProps } from "./Interfaces";
import ResultXmlElement from "./ResultXmlElement/index";

function Result(props: FormProps) {

  const { parsedXmlContent, selectedElementPath, setSelectedElementPath } = useFormData()

  if (parsedXmlContent === undefined)
    return <></>

  return (
    <>
      <Card sx={props.sx}>
        <CardHeader title="Resultaat voorbeeld" />
        <CardContent>
          <div className="result-xml">
            <ResultXmlElement
              element={parsedXmlContent!}
              setSelectedElementPath={setSelectedElementPath}
              selectedElementPath={selectedElementPath} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Result;
