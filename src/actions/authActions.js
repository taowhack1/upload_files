import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';
const url = 'http://192.168.5.230:8080/upload';
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
    localStorage.removeItem('user_id');
    dispatch({ type: UNAUTH_USER });
  };
};

export const signIn = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${url}/login`, user, config);
    console.log(response.data);
    if (response.data.user_login === false) {
      alert('Username หรือ Password ไม่ถูกต้อง!');
    }
    if (response.data.user_login === true) {
      localStorage.setItem('authData', JSON.stringify(response.data.user_data));
      localStorage.setItem('user_id', response.data.user_data.user_id);
      const token = localStorage.getItem('authData');
      dispatch({
        type: AUTH_USER,
        payload: response.data.user_data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
    alert(err);
    console.log(err);
  }
};
