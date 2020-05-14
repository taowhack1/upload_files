import React from "react";

import { Typography, Menu, MenuItem, IconButton } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../files/StyleFiles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChangePassword from "../authen/ChangePassword";
import UserImage from "./user.svg";
import Divider from "@material-ui/core/Divider";

const MenuNavbarRespon = (props) => {
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
                <img src={UserImage} width="40" />
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
                <MenuItem disabled>
                    <Typography>{authdata.user_name}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Typography variant="inherit">
                        <ChangePassword closeMenu={handleClose} />
                    </Typography>
                </MenuItem>
                <MenuItem onClick={props.signOut}>
                    <Typography variant="inherit">ออกจากระบบ</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
};
export default MenuNavbarRespon;
