import {
  GET_LOGS,
  SET_LOADING,
  SEARCH_LOGS,
  LOGS_ERROR,
  GET_LOGS_DELETE,
} from '../actions/types';

const initialState = {
  logs: null,
  logsdelete: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case GET_LOGS_DELETE:
      return {
        ...state,
        logsdelete: action.payload,
        loading: false,
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
