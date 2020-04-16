import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import EcoIcon from '@material-ui/icons/Eco';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const authenticated = useSelector((state) => state.authReducer.authenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) {
      history.push('/signin');
    }
  }, [authenticated]);

  const guestLinks = (
    // <Toolbar color='inherit'>
    //   <EcoIcon />
    //   <Button color='inherit' component={Link} to='/'>
    //     Upload Files
    //   </Button>
    // </Toolbar>
    <></>
  );

  const authLinks = (
    <Toolbar>
      <Button color='inherit' component={Link} to='/'>
        ระบบจัดการเอกสารออนไลน์
      </Button>
      <Button color='inherit' onClick={() => dispatch(signOut())}>
        Sign Out
      </Button>
    </Toolbar>
  );

  return (
    <div className={classes.root}>
      <AppBar>{authenticated ? authLinks : guestLinks}</AppBar>
    </div>
  );
};
export default Navbar;
