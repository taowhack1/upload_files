import { GET_FILES, ADD_FILE, DELETE_FILE, SET_LOADING } from "./types";
import axios from "axios";
const url = "http://192.168.5.230:8080/upload";

export const getFiles = (folder_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(`${url}/accessfile/folder_id=${folder_id}`);
    const data = await res.json();
    dispatch({
      type: GET_FILES,
      payload: data,
    });
  } catch (err) {
    console.log("Error");
  }
};

export const deleteFile = (fileId, snackAlert) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
    data: {
      file_id: fileId,
    },
  };
  try {
    const res = await axios.delete(`${url}/file/delete`, config);
    if (res.data.success) {
      dispatch({
        type: DELETE_FILE,
        payload: res.data,
      });
      snackAlert("ลบเอกสารสำเร็จ", "success");
    } else {
      snackAlert("พบข้อผิดพลาดไม่สามารถลบไฟล์ได้");
    }

    console.log(res.data);
  } catch (err) {
    snackAlert("พบข้อผิดพลาดไม่สามารถลบไฟล์ได้ " + err);
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
