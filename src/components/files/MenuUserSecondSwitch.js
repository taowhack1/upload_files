import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './StyleFiles';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@material-ui/core/';
import {
  updateActiveUser,
  getUserAll,
  getUser,
} from '../../actions/authActions';

const MenuUserSecondSwitch = (props) => {
  const { userId, userActive } = props;
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const { foldersadmin } = useSelector((state) => state.folder);
  const loadingAuth = useSelector((state) => state.auth.loading);
  const loadingFolder = useSelector((state) => state.folder.loading);

  const classes = useStyles();

  const [userdata, setUserData] = useState({
    user_id: '',
    user_name: '',
    user_firstname: '',
    user_lastname: '',
    user_active: props.userActive,
    authorized_id: '',
  });

  const [switchstatus, setSwitchstatus] = useState(userdata.user_active);

  useEffect(() => {
    async function getUsers() {
      if (users === null) {
        await dispatch(getUserAll());
        await setSwitchstatus(userActive);
      }
      console.log(userActive);

      await dispatch(getUser(userId));

      if (user !== null) {
        console.log('user not null');
        await setUserData({
          user_id: user.user_id,
          user_name: user.user_name,
          user_firstname: user.user_firstname,
          user_lastname: user.user_lastname,
          user_active: user.user_active,
          authorized_id: user.authorized_id,
        });
        await setSwitchstatus(user.user_active);
      }
    }
    getUsers();
  }, []);

  const handleChange = async () => {
    if (userdata.user_active !== null && userdata.user_active === false) {
      await dispatch(
        updateActiveUser(
          {
            user_id: userdata.user_id,
            user_active: true,
            authorized_id: userdata.authorized_id,
          },
          props.snackAlert
        )
      );

      await setSwitchstatus(!userdata.user_active);

      await setUserData({ ...userdata, user_active: true });
      await dispatch(getUser(userId));
    }

    if (userdata.user_active !== null && userdata.user_active === true) {
      await dispatch(
        updateActiveUser(
          {
            user_id: userdata.user_id,
            user_active: false,
            authorized_id: userdata.authorized_id,
          },
          props.snackAlert
        )
      );

      await setSwitchstatus(!userdata.user_active);
      await setUserData({ ...userdata, user_active: false });
      await dispatch(getUser(userId));
    }
  };

  const userSwitch = (
    <Switch
      checked={switchstatus}
      onChange={handleChange}
      className={classes.tableMargin}
    ></Switch>
  );

  return (
    <Fragment>
      {user !== null ? userSwitch : console.log('Switch Error')}
    </Fragment>
  );
};

export default MenuUserSecondSwitch;
