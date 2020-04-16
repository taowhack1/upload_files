import {
  GET_FOLDERS,
  ADD_FOLDERS,
  SET_LOADING,
  POSTS_ERROR,
} from '../actions/types';

const initialState = {
  folders: null,
  current: null,
  loading: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLDERS:
      return {
        ...state,
        folders: action.payload,
        loading: false,
      };
    case ADD_FOLDERS:
      return {
        ...state,
        folders: [action.payload, ...state.folders],
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
