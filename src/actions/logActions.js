import {
  GET_LOGS,
  GET_LOGS_DELETE,
  SET_LOADING,
  LOGS_ERROR,
  SEARCH_LOGS,
} from './types';
const url = 'http://192.168.5.230:8080';
// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${url}/history/file/upload`);
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

export const getLogsDelete = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${url}/history/file/delete`);
    const data = await res.json();

    dispatch({
      type: GET_LOGS_DELETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

// Search server logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${url}/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
