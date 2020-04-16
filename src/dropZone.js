import React, { useCallback } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

class dropZone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange(files) {
    this.setState({
      files: files,
    });

    // fetch("http://localhost/REACT_API/upload.php", {
    //   method: "POST",
    //   body: this.state.files,
    // }) && alert("uploaded");
  }
  handleUpload() {
    if (this.state.files) {
      let formData = new FormData();
      this.state.files.forEach((files) => {
        formData.append("files[]", files);
        // formData.set("files[]", files);
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

  render() {
    return (
      <div>
        <DropzoneArea onChange={this.handleChange.bind(this)} />
        <Button color="primary" onClick={this.handleUpload}>
          Upload
        </Button>
      </div>
    );
  }
}

export default dropZone;
