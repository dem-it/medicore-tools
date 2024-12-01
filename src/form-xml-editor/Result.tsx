import { Card, CardContent, CardHeader } from "@mui/material";
import FormProps from "./FormProps";

function Result(props: FormProps) {
  return (
    <>
      <Card sx={props.sx}>
        <CardHeader title="Resultaat voorbeeld" />
        <CardContent>
          {props.xmlContent}
        </CardContent>
      </Card>
    </>
  );
}

export default Result;
