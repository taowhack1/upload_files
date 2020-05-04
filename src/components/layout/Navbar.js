import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { MenuItem, Grid } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: '#1976D2',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 25,
  },
}));

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (!authenticated) {
      history.push('/signin');
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
    <Toolbar>
      <Grid container>
        <Grid item xs={3}>
          {' '}
          <Typography className={classes.title} component={Link} to='/'>
            ระบบจัดการเอกสารออนไลน์
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {' '}
          <Typography
            className={classes.title}
            component={Link}
            to='/viewfolderadmin'
          >
            จัดการโฟลเดอร์
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {' '}
          <Typography
            className={classes.title}
            component={Link}
            to='/manageuser'
          >
            จัดการผู้ใช้งาน
          </Typography>
        </Grid>
      </Grid>

      {auth && (
        <div>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <AccountCircle fontSize='large' />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem>เปลี่ยน Password</MenuItem>
            <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
          </Menu>
        </div>
      )}
    </Toolbar>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar}>
        {authenticated ? authLinks : console.log('Guest')}
      </AppBar>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
export default Navbar;
