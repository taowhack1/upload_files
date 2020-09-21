import { SEARCH_FILES, SET_LOADING, CLEAR_SEARCH_FILES } from './types';
import axios from 'axios';
const url = 'http://192.168.5.230:8080';

export const searchFiles = (userId, text) => async (dispatch) => {
  // dispatch({
  //   type: SET_LOADING,
  // });

  const res = await axios.get(
    `${url}/search/user_id=${userId}/file_name=${text}`
  );

  dispatch({
    type: SEARCH_FILES,
    payload: res.data,
  });
};

export const clearSearchFiles = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_FILES,
  });
};
