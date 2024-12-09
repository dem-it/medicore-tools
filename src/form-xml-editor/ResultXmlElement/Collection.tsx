import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import { useState } from "react";
import ResultXmlElement from ".";
import { CollectionStyle, Construct, ConstructBox, ConstructTable } from "../Attributes/CollectionAttributes";
import { ResultXmlElementProps } from '../Interfaces';
import AddDivider from './HighOrderComponent/AddDivider';
import HeaderLabel from './HighOrderComponent/HeaderLabel';

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

    if (attributes.style === CollectionStyle.Tabs)
        return <CollectionTabs {...props} />

    if (attributes.style === CollectionStyle.Box)
        return <CollectionBox {...props} />

    if (attributes.style === CollectionStyle.Table)
        return <CollectionTable {...props} />

    console.log('Collection style not implemented:', attributes.style)

    return <></>
}

const CollectionTable = (props: ResultXmlElementProps) => {

    const attributes = ConstructTable(props.element.attributes)

    //make a 2d array of the children with maximum the given columns per list
    const arr2d = []
    for (let i = 0; i < props.element.children!.length; i += attributes.columns) {
        arr2d.push(props.element.children!.slice(i, i + attributes.columns))
    }

    return <>
        <div className={attributes.visible ? '' : 'hidden'}>
            <HeaderLabel {...props} label='Table' />
            <TableContainer>
                <Table>
                    <TableBody>
                        {arr2d.map((row, rowIndex) => (
                            <TableRow key={`table-${props.element.path}-row-${rowIndex}`}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={`table-${props.element.path}-cell-${rowIndex}-${cellIndex}`}>
                                        <ResultXmlElement {...props} element={cell} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <AddDivider path={props.element.path} />
    </>
}

const CollectionBox = (props: ResultXmlElementProps) => {

    const attributes = ConstructBox(props.element.attributes)

    return <>
        <div className={attributes.visible ? '' : 'hidden'}>
            <HeaderLabel {...props} label={attributes.label} />
            <Paper elevation={3} sx={{ padding: '10px' }}>
                {props.element?.children?.map((child, index) => <ResultXmlElement key={`collectionbox-child-${child.path}-${index}`} {...props} element={child} />)}
            </Paper>
        </div>
        <AddDivider path={props.element.path} />
    </>
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
        <div className={attributes.visible ? '' : 'hidden'}>
            <HeaderLabel {...props} label="Tabs" />
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {props.element.children?.map((child, index) => {
                    const childAttributes = Construct(child.attributes)
                    return <Tab key={`tab-${child.path}-${attributes.name}-${index}`} {...a11yProps(index)} label={childAttributes.name} />
                })}
            </Tabs>

            {props.element.children?.map((child, index) => {
                return <CustomTabPanel key={`tabpanel-${child.path}-${attributes.name}-${index}`} value={value} index={index}>
                    {child.children?.map((subChild, subIndex) => <ResultXmlElement key={`tabpanel-child-${subChild.path}-${subIndex}`} {...props} element={subChild} />)}
                </CustomTabPanel>
            })}
        </div>
        <AddDivider path={props.element.path} />
    </>
}

export default Collection