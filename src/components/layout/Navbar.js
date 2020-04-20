import React, { useState, useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions/authActions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  console.log(props);
  return (
    <Tab
      component={Link}
      to="/Admin"
      // onClick={(event) => {
      //   event.preventDefault();
      // }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#1976D2",
  },
  menuButton: {
    marginRight: theme.spacing(1),
    fontSize: "20px",
  },
  title: {
    flexGrow: 1,
  },
  userBtn: {
    position: "absolute",
    right: 5,
  },
  toolbar: {
    minHeight: 0,
    padding: "8px 0px 0px 0px",
  },
}));

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const authenticated = useSelector((state) => state.authReducer.authenticated);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [admin, setAdmin] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (!authenticated) {
      history.push("/signin");
    }
  }, [authenticated]);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };

  const authLinks = (
    <Toolbar className={classes.toolbar}>
      {admin ? (
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChangeTab}
          aria-label="nav tabs example"
        >
          <Tab
            // onClick={(event) => {
            //   event.preventDefault();
            // }}
            className={classes.menuButton}
            label="จัดการเอกสาร"
            component={Link}
            to="/"
          />
          <Tab
            // onClick={(event) => {
            //   event.preventDefault();
            // }}
            className={classes.menuButton}
            label="จัดการผู้ใช้งาน"
            component={Link}
            to="/admin"
          />
        </Tabs>
      ) : (
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to="/"
        >
          ระบบจัดการเอกสารออนไลน์
        </Typography>
      )}
      {auth && (
        <div className={classes.userBtn}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            style={{ padding: "5px" }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
          </Menu>
        </div>
      )}
    </Toolbar>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar}>
        {authenticated ? authLinks : console.log("Guest")}
      </AppBar>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
export default Navbar;
