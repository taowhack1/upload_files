import React, { useState, useEffect } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser, getUser } from '../../actions/authActions';
import Hidden from '@material-ui/core/Hidden';

const ManageUserSwitchAuth = (props) => {
  const { userData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [switchstatus, setSwitchstatus] = useState('');

  useEffect(() => {
    if (userData.authorized_id === 1) {
      setSwitchstatus(false);
    } else {
      setSwitchstatus(true);
    }
  }, []);

  const [user, setUser] = useState({
    user_id: userData.user_id,
    user_active: userData.user_active,
    authorized_id: userData.authorized_id,
  });

  const { authorized_id } = user;

  const handleChange = async () => {
    if (authorized_id === 1) {
      await dispatch(
        updateActiveUser(
          {
            user_id: userData.user_id,
            user_active: userData.user_active,
            authorized_id: 2,
          },
          props.snackAlert,
          'updateAuth'
        )
      );
      await dispatch(getUser(userData.user_id));
      setSwitchstatus(!switchstatus);
      setUser({ ...user, authorized_id: 2 });
    }
    if (authorized_id === 2) {
      await dispatch(
        updateActiveUser(
          {
            user_id: userData.user_id,
            user_active: userData.user_active,
            authorized_id: 1,
          },
          props.snackAlert,
          'updateAuth'
        )
      );
      await dispatch(getUser(userData.user_id));
      setSwitchstatus(!switchstatus);
      setUser({ ...user, authorized_id: 1 });
    }
  };

  return (
    <>
      <Hidden smDown className={classes.tableMargin}>
        <Switch checked={switchstatus} onChange={handleChange}></Switch>
      </Hidden>
      <Hidden mdUp className={classes.iconButton}>
        <Switch checked={switchstatus} onChange={handleChange}></Switch>
      </Hidden>
    </>
  );
};

export default ManageUserSwitchAuth;
