import { GET_FILES, ADD_FOLDERS, SET_LOADING } from './types';
import axios from 'axios';
const url = 'http://192.168.5.230:8080/upload';

export const getFiles = (folder_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(`${url}/filefolder/folder_id=${folder_id}`);
    const data = await res.json();
    dispatch({
      type: GET_FILES,
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
