
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListItemButton,
} from '@mui/material';
import  React, { useState }  from "react";
import {
    Inbox as InboxIcon,
    Mail as MailIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Inbox,
    ExpandLess,
    ExpandMore,
    Dashboard,
    PermIdentity
} from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    ListItemButton:{
        paddingTop: "2px !important", paddingBottom: "2px !important", borderRadius: "5px !important",
        fontWeight: "700 !important",
        "&.active": {
            backgroundColor: "#eee !important"
        }
    },
    ListItemButtonLevel: {
        paddingTop: "2px !important", paddingBottom: "2px !important", borderRadius: "5px !important", paddingLeft: "25px !important",
        "&.active": {
            backgroundColor: "#eee !important"
        }
    },
    icon: {
        minWidth: "30px !important"
    }
}));

const data = [  
    {    
        id: 1,    
        name: 'Dashboard',
        icon: <Dashboard />, 
        submenus: [],
        link: "/"
  },
  {
    id: 2,
    name: 'Phân quyền',
    icon: <PermIdentity />,  
    submenus: [      
        { id: 2.1, name: 'Role', link: "/phan-quyen/role" },      
        { id: 2.2, name: 'Permission', link: "/phan-quyen/permission" },      
    ],
  },
//   {
//     id: 3,
//     name: 'Menu 3',
//     icon: <InboxIcon />,  
//     submenus: [],
//     link: "/", 
//   },
];


function SiderBar() {
    
    const classes = useStyles();
    const [open, setOpen] = useState({});

    const handleClick = (id) => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }));
    };


    return ( 
        <List component="nav" 
            // sx={{position: "sticky"}} 
            style={{ borderRight: "2px solid #ccc", minHeight: "100%" }}
        >
        {data.map((menu) => (
            <React.Fragment key={menu.id}>
                <ListItem
                    button className={classes.ListItemButton} onClick={() => handleClick(menu.id)}
                    {...(menu.link ? { component: NavLink, to: menu.link, 
                        // activeClassName:"Mui-selected" 
                    } : {})}
                    
                >
                    <ListItemIcon className={classes.icon}>
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText sx={{ fontWeight: 700 }} primary={menu.name} />
                    <>
                        {
                            menu.submenus.length <= 0 ? 
                                "" : open[menu.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                    </>
                </ListItem>
                <Collapse in={open[menu.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {menu.submenus.map((submenu) => (
                        <ListItem
                            button
                            key={submenu.id}
                            className={classes.ListItemButtonLevel}
                            {...(submenu.link ? { component: NavLink, to: submenu.link } : {})}
                        >
                            <ListItemIcon className={classes.icon}>
                                {submenu.icon}
                            </ListItemIcon>
                            <ListItemText primary={submenu.name} />
                        </ListItem>
                    ))}
                    </List>
                </Collapse>
            </React.Fragment>
        ))}
        </List>
     );
}

export default SiderBar;