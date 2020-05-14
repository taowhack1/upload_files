import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Grid, Icon } from '@material-ui/core';
import MenuNavbar from '../menu/MenuNavbar';
import useStyles from '../files/StyleFiles'
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuNavbarRespon from '../menu/MenuNavbarRespon';
import MenuAdmin from '../menu/MenuAdmin';


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
    <div>
      <div>
        <Hidden xsDown>
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
                    <Grid >
                      {' '}
                      <Typography
                        className={classes.title}
                        component={Link}
                        to='/manageuserfirst'
                      >
                        ประวัติการอัพโหลด
                    </Typography>
                    </Grid>
                    <Grid >
                      {' '}
                      <Typography
                        className={classes.title}
                        component={Link}
                        to='/manageuserfirst'
                      >
                        ประวัติการลบ
                    </Typography>
                    </Grid>
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
        </Hidden>
      </div>
      <div>
        <Hidden smUp>
          <Toolbar>
            {authdata &&
              <Grid container>
                {authdata.authorized_id == 1
                  ?
                  <Grid container>
                    <Grid >
                      {' '}
                      <Typography className={classes.title} component={Link} to='/'>
                        ระบบจัดการเอกสารออนไลน์sss
                    </Typography>
                    </Grid>
                  </Grid>
                  :
                  <Grid container>
                    <Grid >
                      <MenuAdmin />
                    </Grid>
                  </Grid>
                }
              </Grid>
            }
            {auth && (
              <div>
                <MenuNavbarRespon signOut={handleSignOut} />
              </div>
            )}
          </Toolbar>
        </Hidden>
      </div>
    </div >
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
