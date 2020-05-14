import React from "react";
import { useDispatch } from "react-redux";
import "./upload_style.css";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Typography, IconButton } from "@material-ui/core";
import useStyles from "./StyleFiles";
import { download } from "../../actions/fileActions";
import axios from "axios";
import Hidden from '@material-ui/core/Hidden';

export default function ConfirmDownload(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const filename = props.filename;
  const fileId = props.fileid;

  //console.log(filename);

  const FileDownload = require("js-file-download");

  const handleDownload = () => {
    dispatch(download(fileId, filename));
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
      <Hidden mdDown >
        <IconButton className={classes.tableMargin} onClick={handleOpen}>
          <GetAppIcon />
        </IconButton>
      </Hidden>
      <Hidden smUp >
        <IconButton className={classes.iconButton} onClick={handleOpen}>
          <GetAppIcon />
        </IconButton>
      </Hidden>

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
