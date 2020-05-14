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
                <MenuIcon />
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
                        component={Link}
                        to='/viewfolderadmin'
                        variant="inherit">จัดการโฟลเดอร์
                        </Typography>
                </MenuItem>
                <MenuItem >
                    <Typography
                        component={Link}
                        to='/manageuserfirst'
                        variant="inherit">
                        จัดการผู้ใช้งาน
                        </Typography>
                </MenuItem>
                <MenuItem >
                    <Typography
                        variant="inherit"
                    >ประวัติการอัพโหลด</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography
                        variant="inherit"
                    >ประวัติการลบไฟล์</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
};
export default MenuAdmin;
