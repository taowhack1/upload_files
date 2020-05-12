import {
  GET_FOLDERS,
  GET_FOLDERS_ADMIN,
  ADD_FOLDER,
  SET_LOADING,
  POSTS_ERROR,
  DELETE_FOLDER,
  UPDATE_FOLDER,
} from '../actions/types';

const initialState = {
  folders: null,
  foldersadmin: null,
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
    case GET_FOLDERS_ADMIN:
      return {
        ...state,
        foldersadmin: action.payload,
        loading: false,
      };
    case ADD_FOLDER:
      return {
        ...state,
        folders: [action.payload, ...state.folders],
        loading: false,
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        loading: false,
      };
    case DELETE_FOLDER:
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
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
