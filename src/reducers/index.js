import { combineReducers } from 'redux';
import auth from './authReducer';
import folderReducer from './folderReducer';
import commentReducer from './commentReducer';
import fileReducer from './fileReducer';

export default combineReducers({
  folder: folderReducer,
  file: fileReducer,
  comment: commentReducer,
  auth,
});
