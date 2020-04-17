import React, { useState } from "react";
import "./upload_style.css";
import Button from "@material-ui/core/Button";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
const Upload = (props) => {
  const [post, setPost] = useState({
    photos: [],
  });
  const [filesUpload, setFilesUpload] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const { photos } = post;
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleFileChange = (e) => {
    let files = e.target.files;
    // console.log(files);

    handleFiles(files);
  };

  const handleFiles = (files) => {
    let photosArr = [];
    let filesUploadArr = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        let fileobj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        };
        photosArr.push(fileobj);
        filesUploadArr.push(file);
        setPost({
          photos: [...photos, ...photosArr],
        });
        setFilesUpload([...filesUpload, ...filesUploadArr]);
      });
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    // console.log(post.photos[0]);
    console.log(filesUpload);
    // const formData = new FormData();
    // formData.append("myFile", file);
    // try {
    //   const res = await axios.post("/upload/2", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       setUploadPercentage(
    //         parseInt(
    //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         )
    //       );

    //       // Clear percentage
    //       setTimeout(() => setUploadPercentage(0), 10000);
    //     },
    //   });

    //   const { fileName, filePath } = res.data;

    //   setUploadedFile({ fileName, filePath });

    //   setMessage("File Uploaded");
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     setMessage("There was a problem with the server");
    //   } else {
    //     setMessage(err.response.data.msg);
    //   }
    // }
  };
  const handleDelete = (e) => {
    let target = e.target.parentElement;
    let targetIndex = target.dataset.imgindex * 1;
    setPost({
      photos: [
        ...photos.slice(0, targetIndex),
        ...photos.slice(targetIndex + 1),
      ],
    });
    setFilesUpload([
      ...filesUpload.slice(0, targetIndex),
      ...filesUpload.slice(targetIndex + 1),
    ]);
  };
  const handleHighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };
  const handleUnHighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
    setHighlight(false);
  };
  return (
    <form className="" encType="multipart/form-data">
      <div className="custom-form-group">
        <div
          className={
            highlight
              ? "custom-file-drop-area highlight"
              : "custom-file-drop-area"
          }
          onDragEnter={handleHighlight}
          onDragOver={handleHighlight}
          onDragLeave={handleUnHighlight}
          onDrop={handleDrop}
        >
          <input
            type="file"
            name="photos"
            placeholder="Enter photos"
            multiple
            id="filephotos"
            onChange={handleFileChange}
          />
          <label htmlFor="filephotos">{"Drag & Drop"}</label>
        </div>
        <div className="custom-file-preview">
          {photos.length > 0 &&
            photos.map((item, index) => (
              <div className="prev-img" key={index} data-imgindex={index}>
                <span onClick={handleDelete}>&times;</span>
                <img src={item.src} alt={item.name} />
              </div>
            ))}
        </div>
      </div>
      <div className="controlBtn">
        <Button className="UploadBtn" onClick={handleUpload}>
          Upload
        </Button>
        <Button className="Cancel" onClick={() => props.handleClose()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Upload;
