import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./upload_style.css";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Typography, IconButton } from "@material-ui/core";
import useStyles from "./StyleFiles";
import axios from "axios";

export default function ConfirmDownload(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const filename = props.filename;
  const fileid = props.fileid;

  console.log(filename);

  const FileDownload = require("js-file-download");

  const handleDownload = () => {
    axios({
      url: `http://192.168.5.230:8080/download/file_id=` + fileid,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const URL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = URL;
      link.setAttribute("download", filename); //or any other extension

      document.body.appendChild(link);
      link.click();
    });
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton className={classes.tableMargin}>
        <GetAppIcon onClick={handleOpen} />
      </IconButton>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <div className={classes.root}>
              <h1>{props.count}</h1>
              <Typography className={classes.text}>
                คุณต้องการดาวน์โหลด {props.filename} ?
              </Typography>
              <div className={classes.modalBtn}>
                <Button
                  variant="contained"
                  className={classes.modalbtnDownload}
                  onClick={handleDownload}
                >
                  <Typography className={classes.text}>Download</Typography>
                </Button>
                <Button
                  color="primary"
                  className={classes.modalbtnCancel}
                  onClick={handleClose}
                >
                  <Typography className={classes.text}>Cancel</Typography>
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
