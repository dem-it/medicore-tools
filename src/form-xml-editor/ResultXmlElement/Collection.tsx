import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from "react";
import ResultXmlElement from ".";
import { CollectionStyle, Construct } from "../Attributes/CollectionAttributes";
import { ResultXmlElementProps } from '../Interfaces';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

/* Example:
    <collection name="Main Tabs" visible="true" exportable="true" style="tabs" tabtype="horizontal">
        <collection name="Tabblad 1: Formuliervelden" visible="true" exportable="true" style="tab">
        <collection name="Tabblad 2: Velden en stijling" visible="true" exportable="true" style="tab">
        <collection name="Tabblad 3: Overerving" visible="true" exportable="true" style="tab">
    </collection>
 */
const Collection = (props: ResultXmlElementProps) => {


    const attributes = Construct(props.element.attributes)

    if (!attributes.visible)
        return <></>

    if (attributes.style === CollectionStyle.Tabs) {
        return <CollectionTabs {...props} />
    }

    return <>Oh ja, ook iets mee doen</>
}

const CollectionTabs = (props: ResultXmlElementProps) => {
    
    const [value, setValue] = useState(0)
    const attributes = Construct(props.element.attributes)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        
        const newPath = props.element.children![newValue] 
        props.setSelectedElementPath(newPath.path)
    }

    return <>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {props.element.children?.map((child, index) => {
                    const childAttributes = Construct(child.attributes)
                    return <Tab key={`tab-${attributes.name}-${index}`} {...a11yProps(index)} label={childAttributes.name} />
                })}
            </Tabs>

            {props.element.children?.map((child, index) => {
                return <CustomTabPanel key={`tabpanel-${attributes.name}-${index}`} value={value} index={index}>
                    {child.children?.map((subChild, subIndex) => <ResultXmlElement key={`tabpanel-child-${subIndex}`} {...props} element={subChild} />)}
                </CustomTabPanel>
            })}
        </>
}

export default Collection