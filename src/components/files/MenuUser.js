import React, { useState, useEffect } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser } from '../../actions/authActions';

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
        updateActiveUser({
          user_id: userData.user_id,
          user_active: true,
          authorized_id: userData.authorized_id,
        })
      );

      setSwitchstatus({
        ...switchstatus,
        switchchecked: !user_active,
      });

      setUser({ ...user, user_active: true });
    }
    if (user_active === true) {
      await dispatch(
        updateActiveUser({
          user_id: userData.user_id,
          user_active: false,
          authorized_id: userData.authorized_id,
        })
      );

      setSwitchstatus({ ...switchstatus, switchchecked: !user_active });
      setUser({ ...user, user_active: false });
    }
  };

  return (
    <>
      <Switch
        checked={switchchecked}
        onChange={handleChange}
        className={classes.tableMargin}
      ></Switch>
    </>
  );
};

export default MenuUser;
