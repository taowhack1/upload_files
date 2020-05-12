import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_LOADING,
  GET_USER_BY_FOLDER_ID,
  UPDATE_ACCESS_FOLDER,
  GET_USER,
  GET_USER_ALL,
  UPDATE_ACTIVE_USER,
} from '../actions/types';
const initialState = {
  authenticated: null,
  authdata: null,
  user: null,
  users: null,
  loading: null,
  userbyfolderid: null,
  error: null,
  updatestatus: null,
  updatestatususer: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, authdata: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, authdata: null, error: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: null,
        user: action.payload,
        loading: false,
      };
    case GET_USER_ALL:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER_BY_FOLDER_ID:
      return {
        ...state,
        userbyfolderid: action.payload,
        loading: false,
      };
    case UPDATE_ACCESS_FOLDER:
      return {
        ...state,
        updatestatus: action.payload,
        loading: false,
      };
    case UPDATE_ACTIVE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.user_id === action.payload.user_id ? action.payload : user
        ),
        loading: false,
      };

    default:
      return state;
  }
};
