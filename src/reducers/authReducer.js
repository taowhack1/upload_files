import { AUTH_USER, UNAUTH_USER, AUTH_ERROR ,GET_FOLDER_USERS} from '../actions/types';
export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, authdata: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, authdata: null, error: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case GET_FOLDER_USERS:
      return { ...state, folderUser : action.payload};

    default:
      return state;
  }
};
