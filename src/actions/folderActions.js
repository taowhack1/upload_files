import { GET_FOLDERS, ADD_FOLDERS, SET_LOADING } from './types';
import axios from 'axios';
const url = 'http://192.168.5.230:8080/upload';

export const getFolders = (user_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(`${url}/accessfolder/user_id=${user_id}`);
    const data = await res.json();
    dispatch({
      type: GET_FOLDERS,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const addPost = (post) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `http://192.168.5.11:8080/posts`,
      post,
      config
    );
    console.log('addPost Success >>>', res.data);
    dispatch({
      type: ADD_FOLDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log('addPost Error >>>');
    // dispatch({
    //   type: POST_ERROR,
    //   payload: err.response.msg,
    // });
  }
  console.log('addPost Render >>>');
  setLoading();
  setLoading(false);
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
