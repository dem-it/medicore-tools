import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Button, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const drawerWidth = 240
const collapsedDrawerWidth = 60

interface SideMenuProps {
    width: number
    setWidth: (width: number) => void
}

const SideMenu: React.FC<SideMenuProps> = (props) => {
    const [open, setOpen] = useState(false)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    useEffect(() => {
        props.setWidth(open ? drawerWidth : collapsedDrawerWidth)
    }, [open, props.setWidth])

    return (
        <>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : collapsedDrawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: props.width, boxSizing: 'border-box' },
                }}
            >
                <List sx={{ overflowX: 'hidden' }}>
                    <ListItem component={Box}>
                        <div style={{ borderBottom: '2px solid white', paddingBottom: '8px' }}>
                            <b>M++</b>
                        </div>
                    </ListItem>
                    <ListItem component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Home" />}
                    </ListItem>
                    <ListItem
                        component={Link}
                        to='/form-xml-editor'
                        title='Form XML Editor'
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Form XML Editor" />}
                    </ListItem>
                    <ListItem component={Button} onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default SideMenu