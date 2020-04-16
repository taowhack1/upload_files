import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import Modal from "@material-ui/core/Modal";
import "./style.css";
import { DropzoneArea } from "material-ui-dropzone";
const style = {
  root: {
    height: 380,
    // transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "fixed",
    bottom: "16px",
    right: "16px",
  },
};

class SpeedDialTooltipOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      files: [],
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(files) {
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
    return (
      <div style={style.root}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          style={style.speedDial}
          icon={<SpeedDialIcon />}
          onClick={this.handleOpen}
        ></SpeedDial>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={style.modal}
          open={this.state.open}
        >
          <div className="page">
            <div className="container">
              <div className="toolbar">
                <h3>ไฟล์ที่อัพโหลด</h3>
              </div>
              <div className="UploadBox">
                <DropzoneArea
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
                />
                {/* <div className="dropZone"></div> */}
              </div>
              <div className="controlBtn">
                <Button className="UploadBtn" onClick={this.handleUpload}>
                  Upload
                </Button>
                <Button className="Cancel" onClick={this.handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SpeedDialTooltipOpen;
