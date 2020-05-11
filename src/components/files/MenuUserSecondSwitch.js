import React, { useState, useEffect, Fragment } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser } from '../../actions/authActions';
import axios from 'axios';

const MenuUserSecondSwitch = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({
    user_id: null,
    user_name: null,
    user_firstname: null,
    user_lastname: null,
    user_active: null,
    authorized_id: null,
  });

  const [switchstatus, setSwitchstatus] = useState({
    switchchecked: user.user_active,
  });

  useEffect(() => {
    getUser().then((res) => {
      setUser({
        user_id: res.data.user_id,
        user_name: res.data.user_name,
        user_firstname: res.data.user_firstname,
        user_lastname: res.data.user_lastname,
        user_active: res.data.user_active,
        authorized_id: res.data.authorized_id,
      });
      setSwitchstatus({ switchchecked: res.data.user_active });
    });
  }, []);

  const { switchchecked } = switchstatus;
  const { user_active } = user;

  const getUser = () =>
    axios.get(`http://192.168.5.230:8080/upload/user/user_id=${userId}`);

  const handleChange = async () => {
    if (user_active === false) {
      await dispatch(
        updateActiveUser(
          {
            user_id: user.user_id,
            user_name: user.user_name,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname,
            user_active: true,
            authorized_id: user.authorized_id,
          },
          {
            user_id: user.user_id,
            user_active: true,
            authorized_id: user.authorized_id,
          },
          props.snackAlert
        )
      );

      setSwitchstatus({
        ...switchstatus,
        switchchecked: !user_active,
      });

      setUser({ ...user, user_active: true });
    }

    if (user_active === true) {
      await dispatch(
        updateActiveUser(
          {
            user_id: user.user_id,
            user_name: user.user_name,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname,
            user_active: false,
            authorized_id: user.authorized_id,
          },
          {
            user_id: user.user_id,
            user_active: false,
            authorized_id: user.authorized_id,
          },
          props.snackAlert
        )
      );

      setSwitchstatus({ ...switchstatus, switchchecked: !user_active });
      setUser({ ...user, user_active: false });
    }
  };

  const userSwitch = (
    <Switch
      checked={switchchecked}
      onChange={handleChange}
      className={classes.tableMargin}
    ></Switch>
  );

  return (
    <Fragment>
      {user.user_active !== null ? userSwitch : console.log('loading...')}
    </Fragment>
  );
};

export default MenuUserSecondSwitch;
