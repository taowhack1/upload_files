import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_LOADING,
  GET_USER_BY_FOLDER_ID,
  UPDATE_ACCESS_FOLDER,
  GET_USER_ALL,
  UPDATE_ACTIVE_USER,
} from '../actions/types';
const url = 'http://192.168.5.230:8080/upload';
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
    localStorage.removeItem('user_id');
    dispatch({ type: UNAUTH_USER });
  };
};

export const signIn = (user, snackAlert) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${url}/login`, user, config);
    console.log(response.data);
    if (response.data.user_login) {
      if (response.data.user_login_active === false) {
        snackAlert('คุณถูกระงับการใช้งานชั่วคราว โปรดติดต่อผู้ดูแลระบบ');
      } else {
        localStorage.setItem(
          'authData',
          JSON.stringify(response.data.user_data)
        );
        localStorage.setItem('user_id', response.data.user_data.user_id);
        const token = localStorage.getItem('authData');
        dispatch({
          type: AUTH_USER,
          payload: response.data.user_data,
        });
      }
    } else {
      snackAlert('Username หรือ Password ไม่ถูกต้อง!');
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
    snackAlert(err);
  }
};

export const getUserAll = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await fetch(`${url}/userall`);
    const data = await res.json();
    dispatch({
      type: GET_USER_ALL,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const getUserByFolderId = (folder_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await fetch(`${url}/accessuser/folder_id=${folder_id}`);
    const data = await res.json();
    dispatch({
      type: GET_USER_BY_FOLDER_ID,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const updateActiveUser = (user, snackAlert) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${url}/admin/user/update`, user, config);
    console.log(response.data);
    dispatch({
      type: UPDATE_ACTIVE_USER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
    snackAlert(err);
    console.log(err);
  }
};

export const updateAccessFolder = (user, snackAlert) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(user);
  try {
    const response = await axios.post(
      `${url}/admin/accessfolder/realtime`,
      user,
      config
    );
    console.log(response.data);
    dispatch({
      type: UPDATE_ACCESS_FOLDER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
    snackAlert(err);
    console.log(err);
  }
};

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
