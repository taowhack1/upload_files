import {
  GET_FOLDERS,
  GET_FOLDERS_ADMIN,
  ADD_FOLDER,
  SET_LOADING,
  DELETE_FOLDER,
  UPDATE_FOLDER,
} from './types';

import axios from 'axios';

const url = 'http://192.168.5.230:8080/upload';

export const getAllFolder = () => async (dispatch) => {
  try {
    await axios.get(`${url}/folderall`).then((res) => {
      dispatch({
        type: GET_FOLDERS,
        payload: res.data,
      });
    });
  } catch (err) {
    console.log('ไม่สามารถเข้าดึงข้อมูลโฟลเดอร์ได้ !!');
  }
};

export const getFolders = (user_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(`${url}/accessfolder/user_id=${user_id}`);
    const data = await res.json();
    console.log(data);
    dispatch({
      type: GET_FOLDERS,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const getAllFoldersAdmin = (user_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(`${url}/setaccessfolder/user_id=${user_id}`);
    const data = await res.json();
    dispatch({
      type: GET_FOLDERS_ADMIN,
      payload: data,
    });
  } catch (err) {
    console.log('Error');
  }
};

export const deleteFolder = (id, snackAlert) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
    data: {
      folder_id: id,
    },
  };
  try {
    const res = await axios.delete(`${url}/folder/delete`, config);
    console.log(res.data);
    if (res.data.success == false) {
      snackAlert('ไม่สามารถลบโฟลเดอร์ได้', 'error');
    } else {
      snackAlert(`ลบโฟลเดอร์สำเร็จ`, 'success');
    }
    dispatch({
      type: DELETE_FOLDER,
    });
    dispatch(getAllFolder());
  } catch (err) {
    console.log('deleteFile Error >>>');
  }
};
export const createFolder = (folder_name, snackAlert, closeModal) => async (
  dispatch
) => {
  const res = await axios.post(`${url}/folder`, { folder_name });
  if (res.data.success == false) {
    snackAlert('พบข้อผิดพลาด ชื่อโฟลเดอร์ซ้ำ', 'error');
  } else {
    snackAlert(`สร้างโฟลเดอร์ ${res.data.folder_name} สำเร็จ`, 'success');
    dispatch({
      type: ADD_FOLDER,
      payload: res.data,
    });
    closeModal();
  }
};

export const updateFolder = (folder, snackAlert) => async (dispatch) => {
  const { folder_name, folder_id, folder_name_old } = folder;
  const res = await axios.post(`${url}/folder/update`, {
    folder_name,
    folder_id,
    folder_name_old,
  });
  if (res.data.success == true) {
    snackAlert(`เปลี่ยนชื่อโฟลเดอร์สำเร็จ`, 'success');
  } else {
    snackAlert('ชื่อโฟลเดอร์ซ้ำ หรือตรงกับชื่อเดิม', 'error');
  }
  dispatch({
    type: UPDATE_FOLDER,
  });
  dispatch(getAllFolder());
};
// Set loading to true
export const setLoading = (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
