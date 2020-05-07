import React, { useState, useEffect } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser } from '../../actions/authActions';
const MenuUser = (props) => {
  const { userData, refresh } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [switchstatus, setSwitchstatus] = useState({
    switchchecked: userData.user_active,
  });
  // useEffect(() => {
  //   setUser({
  //     user_id: userData.user_id,
  //     user_active: '',
  //     authorized_id: userData.authorized_id,
  //   });
  // }, []);

  const [user, setUser] = useState({
    user_id: userData.user_id,
    user_active: userData.user_active,
    authorized_id: userData.authorized_id,
  });

  const { switchchecked } = switchstatus;

  console.log(user);

  // const handleChangeInput = () => {
  //   setSwitchstatus({ ...switchstatus, switchchecked: !switchchecked });
  //   if (switchchecked === true) {
  //     setUser({ ...user, user_active: true });
  //     dispatch(updateActiveUser(user));
  //     console.log(user);
  //   }
  //   if (switchchecked === false) {
  //     setUser({ ...user, user_active: false });
  //     dispatch(updateActiveUser(user));
  //     console.log(user);
  //   }
  // };

  // const handleChange = (event) => {
  //   setSwitchstatus({ ...switchstatus, switchchecked: !switchchecked });
  //   setUser({ ...user, user_active: event.target.value });
  //   // console.log('Checked >>> ' + switchchecked);
  //   // console.log('Value >>> ' + event.target.value);

  //   // if (userData.user_active === true) {
  //   //   await setUser({ ...user, user_active: false });
  //   //   await dispatch(updateActiveUser(user));
  //   //   console.log('State Check ' + switchchecked);
  //   //   console.log('from value ' + switchchecked);
  //   // }
  //   // if (userData.user_active === false) {
  //   //   await setUser({ ...user, user_active: true });
  //   //   await dispatch(updateActiveUser(user));
  //   //   console.log('State Check ' + switchchecked);
  //   //   console.log('from value ' + switchchecked);
  //   // }
  // };

  const handleChange = async (e) => {
    if (userData.user_active === true) {
      await dispatch(
        updateActiveUser({
          user_id: userData.user_id,
          user_active: false,
          authorized_id: userData.authorized_id,
        })
      );

      console.log('State Check ' + switchchecked);
      console.log('from value ' + switchchecked);
    } else if (userData.user_active === false) {
      await dispatch(
        updateActiveUser({
          user_id: userData.user_id,
          user_active: true,
          authorized_id: userData.authorized_id,
        })
      );
      console.log('State Check ' + switchchecked);
      console.log('from value ' + switchchecked);
    }
    await setSwitchstatus({ ...switchstatus, switchchecked: !switchchecked });
  };

  return (
    <div>
      <Switch
        checked={switchchecked}
        onChange={handleChange}
        className={classes.tableMargin}
      ></Switch>
      {/* <input
        type='text'
        value={user.user_active}
        onChange={handleChangeInput}
      ></input> */}
    </div>
  );
};

export default MenuUser;
