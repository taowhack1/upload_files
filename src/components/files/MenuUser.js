import React, { useState } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { updateActiveUser } from '../../actions/authActions';
const MenuUser = (props) => {
  const { userData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [check, setCheck] = useState({
    checked: userData.user_active,
  });

  const handleChange = () => {
    if (userData.user_active === true) {
      dispatch(
        updateActiveUser({
          user_id: userData.user_id,
          user_active: false,
          authorized_id: userData.authorized_id,
        })
      );
      setCheck({ checked: !check.checked });
    }
    if (userData.user_active === false) {
      dispatch(
        updateActiveUser({
          user_id: userData.user_id,
          user_active: true,
          authorized_id: userData.authorized_id,
        })
      );
      setCheck({ checked: !check.checked });
    }
  };

  return (
    <div>
      <Switch
        checked={check.checked}
        onChange={handleChange}
        className={classes.tableMargin}
      ></Switch>
    </div>
  );
};

export default MenuUser;
