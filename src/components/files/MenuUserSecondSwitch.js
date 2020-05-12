import React, { useState, useEffect, Fragment } from 'react';
import useStyles from './StyleFiles';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser, getUser } from '../../actions/authActions';

const MenuUserSecondSwitch = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [userdata, setUserData] = useState({
    user_id: null,
    user_name: null,
    user_firstname: null,
    user_lastname: null,
    user_active: null,
    authorized_id: null,
  });

  const [switchstatus, setSwitchstatus] = useState({
    switchchecked: userdata.user_active,
  });

  useEffect(() => {
    dispatch(getUser(userId));
    if (user !== null) {
      setUserData({
        user_id: user.user_id,
        user_name: user.user_name,
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname,
        user_active: user.user_active,
        authorized_id: user.authorized_id,
      });
      setSwitchstatus({ switchchecked: user.user_active });
    }
  }, []);

  console.log(user);
  // useEffect(() => {
  //   dispatch(
  //     getUser(userId).then((res) => {
  //       setUserData({
  //         user_id: res.data.user_id,
  //         user_name: res.data.user_name,
  //         user_firstname: res.data.user_firstname,
  //         user_lastname: res.data.user_lastname,
  //         user_active: res.data.user_active,
  //         authorized_id: res.data.authorized_id,
  //       });
  //       setSwitchstatus({ switchchecked: res.data.user_active });
  //     })
  //   );
  // }, []);

  // const getUser = () =>
  //   axios.get(`http://192.168.5.230:8080/upload/user/user_id=${userId}`);

  const handleChange = async () => {
    if (userdata !== null && userdata.user_active === false) {
      await dispatch(
        updateActiveUser(
          {
            user_id: userdata.user_id,
            user_name: userdata.user_name,
            user_firstname: userdata.user_firstname,
            user_lastname: userdata.user_lastname,
            user_active: true,
            authorized_id: userdata.authorized_id,
          },
          {
            user_id: userdata.user_id,
            user_active: true,
            authorized_id: userdata.authorized_id,
          },
          props.snackAlert
        )
      );

      await setSwitchstatus({
        ...switchstatus,
        switchchecked: !userdata.user_active,
      });

      await setUserData({ ...userdata, user_active: true });
      await dispatch(getUser(userId));
    }

    if (userdata !== null && userdata.user_active === true) {
      await dispatch(
        updateActiveUser(
          {
            user_id: userdata.user_id,
            user_name: userdata.user_name,
            user_firstname: userdata.user_firstname,
            user_lastname: userdata.user_lastname,
            user_active: false,
            authorized_id: userdata.authorized_id,
          },
          {
            user_id: userdata.user_id,
            user_active: false,
            authorized_id: userdata.authorized_id,
          },
          props.snackAlert
        )
      );

      await setSwitchstatus({
        ...switchstatus,
        switchchecked: !userdata.user_active,
      });
      await setUserData({ ...userdata, user_active: false });
      await dispatch(getUser(userId));
    }
  };

  const userSwitch = (
    <Switch
      checked={switchstatus.switchchecked}
      onChange={handleChange}
      className={classes.tableMargin}
    ></Switch>
  );

  return (
    <Fragment>
      {user !== null ? userSwitch : console.log('loading...')}
    </Fragment>
  );
};

export default MenuUserSecondSwitch;
