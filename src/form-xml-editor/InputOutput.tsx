import { Button } from "@mui/material"
import { styled } from '@mui/system'
import React, { useEffect, useState } from "react"
import FormElementService from "../services/FormElementService"
import ParseXmlElementService from '../services/ParseXmlElementService'
import { useFormData } from './FormDataContext/FormDataProvider'
import { FormProps } from './Interfaces'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const InputOutput: React.FC<FormProps> = () => {

  const {
    xmlContent,
    parsedXmlContent,
    setSelectedElementPath,
    setParsedXmlContent
  } = useFormData()
  const [xml, setXml] = useState(xmlContent)
  const [xmlFilename, setXmlFilename] = useState('')

  useEffect(() => {
    if (xml === xmlContent)
      return

    setXml(xmlContent)
    // We only need to check if xmlContent is Changed
    // eslint-disable-next-line
  }, [xmlContent])


  function xmlFileSelected(e: any) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      setXmlFilename(file.name)
      reader.onload = (event) => {
        const text = event.target?.result
        if (text) {
          const parsedContent = new ParseXmlElementService(text as string).parseXML()
          setParsedXmlContent(parsedContent)
          setSelectedElementPath("")
        }

        // clean the input file
        e.target.value = null
      }
      reader.readAsText(file)
    }
  }

  function downloadXml(): void {
    const blob = new Blob([xmlContent], { type: 'application/xml' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = xmlFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function removeUuids(): void {
    if (!xmlContent)
      return

    const formElementService = new FormElementService(parsedXmlContent!)
    formElementService.updateAllElements(x => {
      if(x.attributes.uuid)
        x.attributes.uuid = ""
    })
    
    setParsedXmlContent(formElementService.formElement)
  }

  return <React.Fragment>
      <Button
        component="label"
        role={undefined}
        variant={xmlContent ? 'outlined' : 'contained'}
        tabIndex={-1}
      >
        Laad een {xmlContent && 'nieuw'} XML bestand in
        <VisuallyHiddenInput
          type="file"
          onChange={xmlFileSelected}
          multiple
        />
      </Button>

      {xmlContent && <>
        <Button
          component='label'
          role={undefined}
          variant='contained'
          onClick={downloadXml}
        >
          Download XML
        </Button>
        <Button
          component='label'
          role={undefined}
          variant='contained'
          onClick={removeUuids}>
            Verwijder UUID&apos;s
          </Button>
      </>}
    </React.Fragment>
}

export default InputOutput
