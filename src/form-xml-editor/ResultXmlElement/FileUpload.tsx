import { Button } from "@mui/material"
import { styled } from '@mui/material/styles'
import React from "react"
import { Construct } from "../Attributes/FileUploadAttributes"
import { ResultXmlElementProps } from "../Interfaces"
import AddDivider from "./HighOrderComponent/AddDivider"
import HeaderLabel from "./HighOrderComponent/HeaderLabel"

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

interface FileUploadProps extends ResultXmlElementProps {
    name: string
}

/* Example
    <fileupload name="upload file" label="Voeg andere bestanden toe aan een formulier" mandatory="false" value="" visible="true" exportable="true"/>
*/
const FileUpload: React.FC<FileUploadProps> = (props) => {

    const attributes = Construct(props.element.attributes)

    return <div className={attributes.visible ? '' : 'hidden'}>
        <HeaderLabel {...props} label={attributes.label} />
        <Button
            variant='contained'
            style={{ borderColor: '#ccc', backgroundColor: '#eee', color: 'black' }}
            component='label'>
            {props.name}
            <VisuallyHiddenInput
                type='file'
                onChange={e => console.log(e.target.files)} />
        </Button>
        <AddDivider path={props.element.path} />
    </div>
}

export default FileUpload