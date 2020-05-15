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
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import HistoryIcon from '@material-ui/icons/History';

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
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button>
                    <ListItemText>
                        <Typography
                            className={classes.text}
                        >ระบบจัดการเอกสารออนไลน์
                        </Typography>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component={Link}
                    to='/viewfolderadmin'>
                    <ListItemIcon >
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography
                            className={classes.textmenuAdmin}

                        >จัดการโฟลเดอร์
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link}
                    to='/manageuserfirst'>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography
                            className={classes.textmenuAdmin}

                        >
                            จัดการผู้ใช้งาน
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link}
                    to='/historyupload'
                >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography
                            className={classes.textmenuAdmin}
                        >ประวัติการอัพโหลด</Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link}
                    to='/historydelete'>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography
                            className={classes.textmenuAdmin}
                        >ประวัติการลบไฟล์</Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const { authenticated, authdata } = useSelector((state) => state.auth);
    return (
        <div>
            <div>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <IconButton onClick={toggleDrawer(anchor, true)}>
                            <MenuIcon style={{ color: 'white' }}></MenuIcon>
                        </IconButton>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
export default MenuAdmin;
