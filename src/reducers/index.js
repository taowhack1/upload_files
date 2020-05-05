import { combineReducers } from 'redux';
import auth from './authReducer';
import folderReducer from './folderReducer';
import fileReducer from './fileReducer';

export default combineReducers({
  folder: folderReducer,
  file: fileReducer,
  auth,
});
