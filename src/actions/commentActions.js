import {
  ADD_COMMENT,
  GET_COMMENTS,
  SET_LOADING,
  DELETE_COMMENT,
} from './types';
import axios from 'axios';

export const getComments = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch('http://192.168.5.11:8080/comments');
    const data = await res.json();
    dispatch({
      type: GET_COMMENTS,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const getCommentsByPostID = (post_id) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(
      `http://192.168.5.11:8080/comments/findByPostId/${post_id}`
    );
    const data = await res.json();
    dispatch({
      type: GET_COMMENTS,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const addComment = (comment) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `http://192.168.5.11:8080/comments`,
      comment,
      config
    );
    console.log('addComment Success >>>', res.data);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log('addComment Error >>>');
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://192.168.5.11:8080/comments/${id}`);
    console.log('deleteComment Success >>>');
    dispatch({
      type: DELETE_COMMENT,
      payload: id,
    });
  } catch (err) {
    console.log('deleteComment Error >>>');
  }
  console.log('deleteComment Render >>>');
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

//Set Loading
export const setLoading2 = (dispatch) => dispatch({ type: SET_LOADING });
