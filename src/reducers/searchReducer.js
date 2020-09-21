import {
  SEARCH_FILES,
  SEARCH_FILES_ERROR,
  SET_LOADING,
  CLEAR_SEARCH_FILES,
} from '../actions/types';

const initialState = {
  searchfiles: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FILES:
      return {
        ...state,
        searchfiles: action.payload,
        loading: false,
      };
    case CLEAR_SEARCH_FILES:
      return {
        ...state,
        searchfiles: null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_FILES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
