import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Grid } from '@material-ui/core';
import MenuNavbar from '../menu/MenuNavbar';
import useStyles from '../files/StyleFiles'

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { authenticated, authdata } = useSelector((state) => state.auth);
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
      {authdata &&
        <Grid container>
          {authdata.authorized_id == 1
            ?
            <Grid container>
              <Grid >
                {' '}
                <Typography className={classes.title} component={Link} to='/'>
                  ระบบจัดการเอกสารออนไลน์
            </Typography>
              </Grid>
            </Grid>
            :
            <Grid container >
              <Grid >
                {' '}
                <Typography
                  className={classes.title}
                  component={Link}
                  to='/viewfolderadmin'
                >
                  จัดการโฟลเดอร์
            </Typography>
              </Grid>
              <Grid item sm={1}></Grid>
              <Grid >
                {' '}
                <Typography
                  className={classes.title}
                  component={Link}
                  to='/manageuserfirst'
                >
                  จัดการผู้ใช้งาน
            </Typography>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          }
        </Grid>
      }

      {auth && (
        <div>
          <MenuNavbar signOut={handleSignOut} />
        </div>
      )}
    </Toolbar>
  );

  return (
    <div className={classes.AppbarRoot}>
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
