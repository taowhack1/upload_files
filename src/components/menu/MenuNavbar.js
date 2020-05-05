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
import useStyles from '../files/StyleFiles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChangePassword from '../authen/ChangePassword';


const MenuNavbar = (props) => {
    //test Github
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton className={classes.tableMargin} onClick={handleOpen}>
                <AccountCircle fontSize='large' />
            </IconButton>
            <Menu className={classes.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleClose}
            >
                <MenuItem>
                    <Typography variant="inherit" >
                        <ChangePassword closeMenu={handleClose} />
                    </Typography>
                </MenuItem>
                <MenuItem onClick={props.signOut} >
                    <Typography variant="inherit" >Sign Out</Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}
export default MenuNavbar