import {
  GET_FOLDERS,
  ADD_FOLDER,
  SET_LOADING,
  DELETE_FOLDER,
  UPDATE_FOLDER,
} from "./types";
import axios from "axios";

const url = "http://192.168.5.230:8080/upload";

export const getAllFolder = () => async (dispatch) => {
  try {
    await axios.get(`${url}/folderall`).then((res) => {
      dispatch({
        type: GET_FOLDERS,
        payload: res.data,
      });
    });
  } catch (err) {
    console.log("ไม่สามารถเข้าดึงข้อมูลโฟลเดอร์ได้ !!");
  }
};

export const getFolders = (user_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(`${url}/accessfolder/user_id=${user_id}`);
    const data = await res.json();
    dispatch({
      type: GET_FOLDERS,
      payload: data,
    });
  } catch (err) {
    console.log("Error");
  }
};

export const deleteFolder = (id) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
    data: {
      folder_id: id,
    },
  };
  try {
    const res = await axios.delete(`${url}/folder/delete`, config);
    if (res.data.success == false) {
      alert("ไม่สามารถลบโฟลเดอร์ได้ ติดต่อโปรแกรมเมอร์");
    } else {
      alert(`ลบโฟลเดอร์เรียบร้อยแล้ว`);
    }
    dispatch({
      type: DELETE_FOLDER,
      payload: res.data,
    });
    // dispatch({
    //   type: SET_LOADING,
    // })
  } catch (err) {
    console.log("deleteFile Error >>>");
  }
};
export const createFolder = (folder_name) => async (dispatch) => {
  // dispatch({
  //   type: SET_LOADING,
  // });
  const res = await axios.post(`${url}/folder`, { folder_name });
  if (res.data.success == false) {
    //alert("dulicate folder name");
    alert("dulicate folder name");
  } else {
    alert(`สร้างโฟลเดอร์ ${res.data.folder_name} เรียบร้อยแล้ว`);
  }
  dispatch({
    type: ADD_FOLDER,
    payload: res.data,
  });
};

export const updateFolder = (folder) => async (dispatch) => {
  const { folder_name, folder_id, folder_name_old } = folder;
  const res = await axios.post(`${url}/folder/update`, {
    folder_name,
    folder_id,
    folder_name_old,
  });
  if (res.data.success == true) {
    alert(`เปลี่ยนชื่อโฟลเดอร์เรียบร้อยแล้ว`);
  } else {
    alert(res.data.remark);
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
