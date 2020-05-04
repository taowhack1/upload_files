import {
  GET_FILES,
  ADD_FOLDERS,
  SET_LOADING,
  POSTS_ERROR,
  DELETE_FILE,
} from '../actions/types';

const initialState = {
  files: null,
  current: null,
  loading: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
        loading: false,
      };
    case ADD_FOLDERS:
      return {
        ...state,
        folders: [action.payload, ...state.folders],
        loading: false,
      };
    case DELETE_FILE:
      return {
        ...state,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
