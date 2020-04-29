import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import Modal from "@material-ui/core/Modal";
import "./style.css";
import { withStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { DropzoneArea } from "material-ui-dropzone";
import styles from './StyleFilesClass'
import Upload from "./upload";
import { Typography } from "@material-ui/core";

// const style = {
//   root: {
//     height: 380,
//     // transform: "translateZ(0px)",
//     flexGrow: 1,
//   },
//   speedDial: {
//     position: "fixed",
//     bottom: 100,
//     right: 100,
//   },
// };

// const styles = theme => ({
// root: {
//   flexGrow: 1,
// },
// absolute: {
//   position: 'fixed',
//   bottom: theme.spacing(8),
//   right: theme.spacing(8),
//   height: 100,
//   width: 100,
//   backgroundColor: "#1976D2",
// },
// icon: {
//   fontSize: 50,
// },
// });



class SpeedDialTooltipOpen extends Component {
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
        <Fab onClick={this.handleOpen} className={classes.absolute} color="primary" >
          <AddIcon className={classes.icon} />
        </Fab>
        {/* <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.absolute}
          icon={<SpeedDialIcon />}
          onClick={this.handleOpen}
        ></SpeedDial> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
        >
          <div className={classes.modalPaper}>
            <div className={classes.root}>
              <Typography className={classes.text} color="textPrimary">ไฟล์ที่อัพโหลด</Typography>
              <div className={classes.modalIconAlign}>
                <Upload handleClose={this.handleClose} />
                {/* <DropzoneArea
                  style={{
                    width: "150px",
                  }}
                  dropzoneClass="dropZone"
                  //   showPreviewsInDropzone={false}
                  //   showPreviews={true}
                  dropzoneText="วางไฟล์หรือคลิกเพื่อ upload  "
                  filesLimit={5}
                  maxFileSize={30000000}
                  //   useChipsForPreview={true}
                  //   dropzoneParagraphClass="dropZoneText"
                  showFileNames={true}
                  onChange={this.handleChange.bind(this)}
                /> */}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(SpeedDialTooltipOpen);
