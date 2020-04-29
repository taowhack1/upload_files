import React, { useState } from "react";
import "./upload_style.css";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography'
import { useParams, Link } from "react-router-dom";
import Message from "./Message";
import Progress from "./Progress";
import { Theme, useTheme } from '@material-ui/core/styles';
import useStyles from './StyleFiles'
import axios from "axios";
import { Grid, Card } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';


const Upload = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { folder_id, folder_name } = useParams();
  const user_id = localStorage.getItem("user_id")


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
    let formData = new FormData();
    let res;
    formData.append("my_file", filesUpload[0]);
    formData.append("user_id", user_id);
    formData.append("folder_id", folder_id);

    for (let i = 0; i < filesUpload.length; i++) {
      formData.set("my_file", filesUpload[i]);
      //   for (var pair of formData.entries()) {
      //     console.log(pair[0] + ", " + pair[1]);
      //   }
      try {
        res = await axios.post("http://192.168.5.230:8080/upload/file", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    res.data ? UploadSucces() : alert("Error : Something went wrong...");
  };
  const UploadSucces = () => {
    alert("Upload Successfully");
    props.handleClose();
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
      <div className={classes.upload}>
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
          <Grid>
            <input
              type="file"
              name="photos"
              placeholder="Enter photos"
              multiple
              id="filephotos"
              onChange={handleFileChange}
            />
            <label htmlFor="filephotos">{"ลากหรือคลิกเพื่ออัพโหลดไฟล์"}</label>
          </Grid>
        </div>
        {photos.length != 0
          ? <div className={classes.uploadPreview}>

            <List>
              {photos.length > 0 &&
                photos.map((item, index) => (
                  <div className={classes.uploadPreviewList} >
                    <Card className={classes.uploadPreviewCard}>
                      <ListItem key={index} data-imgindex={index}>
                        <span onClick={handleDelete} className={classes.uploadPreviewListIcon}>x</span>
                        <img src={item.src} />
                        <div className={classes.uploadPreviewBox} >
                          <Box className={classes.uploadPreviewListName}
                            my={2}
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            {item.name}
                          </Box>
                        </div>

                        {/* <Box style={{ whiteSpace: 'nowrap' }}>
                          <Typography
                            className={classes.uploadPreviewListName}
                            component="div"
                            my={2}
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            {item.name}
                          </Typography>
                        </Box> */}
                      </ListItem>
                    </Card>
                  </div>
                ))}
            </List>
          </div>
          : <div className={classes.uploadPreviewDisable}></div>
        }
      </div>

      <div className={classes.modalBtnUpload}>
        <Button variant="contained" className={classes.modalbtnCancel} onClick={(e) => handleUpload(e)} >
          <Typography className={classes.text} color="textPrimary" elevation={0}>
            Upload
          </Typography>
        </Button>
        <Button color="primary" className={classes.modalbtnCancel} onClick={() => props.handleClose()}>
          <Typography className={classes.text} color="textPrimary">
            Cancel
             </Typography>
        </Button>
      </div>
    </form>
  );
};

export default Upload;
