import { GET_POSTS, ADD_POST, SET_LOADING } from './types';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch('http://192.168.5.11:8080/posts');
    const data = await res.json();
    dispatch({
      type: GET_POSTS,
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
      type: ADD_POST,
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
