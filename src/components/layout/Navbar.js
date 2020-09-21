import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/authActions';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Grid, Icon } from '@material-ui/core';
import MenuNavbar from '../menu/MenuNavbar';
import MenuNavbarRespon from '../menu/MenuNavbarRespon';
import MenuAdmin from '../menu/MenuAdmin';
import Hidden from '@material-ui/core/Hidden';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { searchFiles, clearSearchFiles } from '../../actions/searchActions';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";
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
    fontSize: 20,
    marginRight: 30,
    ['@media (max-width:1050px)']: { // eslint-disable-line no-useless-computed-key
      marginRight: 20,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { authenticated, authdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
    history.push('/search');
  };

  useEffect(() => {
    if (text !== '') {
      dispatch(searchFiles(authdata.user_id, text));
    } else {
      dispatch(clearSearchFiles());
      history.push('/');
    }
  }, [text]);

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
        <Hidden smDown>
          <Toolbar>
            {authdata && (
              <Grid container>
                {authdata.authorized_id == 1 ? (
                  <Grid container>
                    <Grid>
                      {' '}
                      <Typography
                        className={classes.title}
                        component={Link}
                        to='/'
                      >
                        ระบบจัดการเอกสารออนไลน์
                      </Typography>
                    </Grid>

                  </Grid>
                ) : (
                    <Grid container>
                      <Grid>
                        <Typography
                          style={{ marginRight: 20 }}
                          className={classes.title}
                          component={Link}
                          to='/viewfolderadmin'
                        >
                          จัดการโฟลเดอร์
                      </Typography>
                      </Grid>
                      <Grid>

                        <Typography
                          className={classes.title}
                          component={Link}
                          to='/manageuserfirst'
                        >
                          จัดการผู้ใช้งาน
                      </Typography>
                      </Grid>
                      <Grid >
                        <Typography
                          className={classes.title}
                          component={Link}
                          to='/historyupload'
                        >
                          ประวัติการอัพโหลด
                      </Typography>
                      </Grid>
                      <Grid >
                        <Typography
                          className={classes.title}
                          component={Link}
                          to='/historydelete'
                        >
                          ประวัติการลบไฟล์
                      </Typography>
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            )}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='ค้นหา'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name='text'
                onChange={onChange}
                value={text}
              />
            </div>
            {auth && (
              <div>
                <MenuNavbar signOut={handleSignOut} />
              </div>
            )}
          </Toolbar>
        </Hidden>
      </div>
      <div>
        <Hidden mdUp>
          <Toolbar>
            {authdata && (
              <Grid container>
                {authdata.authorized_id == 1 ? (
                  <Grid container>
                    <Grid>
                      <IconButton
                        style={{ color: 'white' }}
                        component={Link}
                        to='/'>
                        <HomeIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ) : (
                    <Grid container>
                      <Grid>
                        <MenuAdmin />
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            )}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='ค้นหา'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name='text'
                onChange={onChange}
                value={text}
              />
            </div>

            {auth && (
              <div>
                <MenuNavbarRespon signOut={handleSignOut} />
              </div>
            )}
          </Toolbar>
        </Hidden>
      </div>
    </div>
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
