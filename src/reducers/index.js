import { combineReducers } from 'redux';
import folderReducer from './folderReducer';
import fileReducer from './fileReducer';
import authReducer from './authReducer';

export default combineReducers({
  folder: folderReducer,
  file: fileReducer,
  auth: authReducer,
});
