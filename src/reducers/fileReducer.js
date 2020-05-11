import {
  GET_FILES,
  ADD_FILE,
  SET_LOADING,
  DELETE_FILE,
  DOWNLOAD_FILE,
} from "../actions/types";

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
    case ADD_FILE:
      return {
        ...state,
        files: [action.payload, ...state.files],
        loading: false,
      };
    case DELETE_FILE:
      return {
        ...state,
        loading: false,
      };
    case DOWNLOAD_FILE:
      return {
        ...state,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
