import {
  GET_FILES,
  ADD_FILE,
  DELETE_FILE,
  SET_LOADING,
  DOWNLOAD_FILE,
} from "./types";
import axios from "axios";
const url = "http://192.168.5.230:8080";
export const download = (fileId, filename) => async (dispatch) => {
  axios({
    url: `${url}/download/file_id=` + fileId,
    method: "GET",
    responseType: "blob", // important
  }).then((res) => {
    console.log(res.data);
    const URL = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = URL;
    link.setAttribute("download", filename); //or any other extension

    document.body.appendChild(link);
    link.click();
    dispatch({ payload: res.data, type: "DOWNLOAD_FILE" });
  });
};
export const getFiles = (folder_id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      `http://192.168.5.230:8080/upload/accessfile/folder_id=${folder_id}`
    );
    const data = await res.json();
    dispatch({
      type: GET_FILES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
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
    const res = await axios.delete(`${url}/upload/file/delete`, config);
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
