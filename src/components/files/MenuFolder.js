import React from "react";

import {
    Typography,
    Menu,
    MenuItem,
    IconButton,

} from "@material-ui/core/";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './StyleFiles';


const MenuFolder = (props) => {
    //test Github
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMoreVertIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMoreVertIconClose = () => {
        setAnchorEl(null);
    };

    const [folder, setFolder] = React.useState(props.listRowFolder);

    return (
        <div>
            <IconButton className={classes.tableMargin} onClick={handleMoreVertIconClick}>
                <MoreVertIcon ></MoreVertIcon>
            </IconButton>
            <Menu className={classes.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleMoreVertIconClose}
            >
                <MenuItem onClick={()=>props.deleteFolder(folder)}>
                    <ListItemIcon >
                        <RemoveIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" className={classes.menuItem}>ลบ</Typography>
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <CreateIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" className={classes.menuItem}  >แก้ไข</Typography>
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <GetAppIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" className={classes.menuItem} >ดาวน์โหลด</Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}
export default MenuFolder