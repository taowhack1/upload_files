import React, { useState, useEffect } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser, getUser } from '../../actions/authActions';
import Hidden from '@material-ui/core/Hidden';

const MenuUser = (props) => {
  const { userData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [switchstatus, setSwitchstatus] = useState({
    switchchecked: userData.user_active,
  });

  const [user, setUser] = useState({
    user_id: userData.user_id,
    user_active: userData.user_active,
    authorized_id: userData.authorized_id,
  });

  const { switchchecked } = switchstatus;
  const { user_active } = user;

  const handleChange = async () => {
    if (user_active === false) {
      await dispatch(
        updateActiveUser(
          // {
          //   user_id: userData.user_id,
          //   user_name: userData.user_name,
          //   user_firstname: userData.user_firstname,
          //   user_lastname: userData.user_lastname,
          //   user_active: true,
          //   authorized_id: userData.authorized_id,
          // },
          {
            user_id: userData.user_id,
            user_active: true,
            authorized_id: userData.authorized_id,
          },
          props.snackAlert
        )
      );
      await dispatch(getUser(userData.user_id));
      setSwitchstatus({
        ...switchstatus,
        switchchecked: !user_active,
      });
      setUser({ ...user, user_active: true });
    }
    if (user_active === true) {
      await dispatch(
        updateActiveUser(
          // {
          //   user_id: userData.user_id,
          //   user_name: userData.user_name,
          //   user_firstname: userData.user_firstname,
          //   user_lastname: userData.user_lastname,
          //   user_active: false,
          //   authorized_id: userData.authorized_id,
          // },
          {
            user_id: userData.user_id,
            user_active: false,
            authorized_id: userData.authorized_id,
          },
          props.snackAlert
        )
      );
      await dispatch(getUser(userData.user_id));
      setSwitchstatus({ ...switchstatus, switchchecked: !user_active });
      setUser({ ...user, user_active: false });
    }
  };

  return (
    <>
      <Hidden smDown className={classes.tableMargin}>
        <Switch
          checked={switchchecked}
          onChange={handleChange}

        ></Switch>
      </Hidden>
      <Hidden mdUp className={classes.iconButton}>
        <Switch
          checked={switchchecked}
          onChange={handleChange}
        ></Switch>
      </Hidden>
    </>
  );
};

export default MenuUser;
