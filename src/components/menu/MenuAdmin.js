import React from "react";
import { Link } from 'react-router-dom'
import { Typography, Menu, MenuItem, IconButton } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../files/StyleFiles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChangePassword from "../authen/ChangePassword";
import UserImage from "./user.svg";
import Divider from "@material-ui/core/Divider";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const MenuAdmin = (props) => {
    //test Github
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { authenticated, authdata } = useSelector((state) => state.auth);
    return (
        <div>
            <IconButton className={classes.tableMargin} onClick={handleOpen}>
                <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <Menu
                className={classes.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleClose}
            >
                <MenuItem>
                    <Typography
                        className={classes.text}
                        component={Link}
                        to='/viewfolderadmin'
                        onClick={handleClose}
                        variant="inherit">จัดการโฟลเดอร์
                        </Typography>
                </MenuItem>
                <MenuItem >
                    <Typography
                        className={classes.text}
                        component={Link}
                        to='/manageuserfirst'
                        onClick={handleClose}
                        variant="inherit">
                        จัดการผู้ใช้งาน
                        </Typography>
                </MenuItem>
                <MenuItem >
                    <Typography
                        className={classes.text}
                        component={Link}
                        to='/historyupload'
                        onClick={handleClose}
                        variant="inherit"
                    >ประวัติการอัพโหลด</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography
                        className={classes.text}
                        component={Link}
                        to='/historydelete'
                        onClick={handleClose}
                        variant="inherit"
                    >ประวัติการลบไฟล์</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
};
export default MenuAdmin;
