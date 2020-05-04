import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import "./style.css";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import styles from "./StyleFilesClass";
import Upload from "./upload";
import { Typography } from "@material-ui/core";

class UploadBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(files) {
    console.log(files);
    this.setState({
      files: files,
    });
  }
  handleUpload() {
    if (this.state.files) {
      let formData = new FormData();
      this.state.files.forEach((files) => {
        formData.append("files[]", files);
        console.log(formData);
      });
      fetch("http://localhost/REACT_API/upload.php", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      console.log(0);
    }
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Fab
          onClick={this.handleOpen}
          className={classes.absolute}
          color="primary"
        >
          <AddIcon className={classes.icon} />
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
        >
          <div className={classes.modalPaper}>
            <div className={classes.root}>
              <Typography className={classes.text} color="textPrimary">
                ไฟล์ที่อัพโหลด
              </Typography>
              <div className={classes.modalIconAlign}>
                <Upload
                  refresh={this.props.refresh}
                  handleClose={this.handleClose}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(UploadBtn);