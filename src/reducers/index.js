import { combineReducers } from 'redux';
import authReducer from './authReducer';
import folderReducer from './folderReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  folder: folderReducer,
  comment: commentReducer,
  authReducer,
});
