import React from "react";
import { useDispatch } from "react-redux";
import "./upload_style.css";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  Button,
  Typography,
  IconButton,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import useStyles from "./StyleFiles";
import { download } from "../../actions/fileActions";

export default function ConfirmDownloadAdmin(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const file = props.file;
  const FileDownload = require("js-file-download");

  const handleDownload = () => {
    dispatch(download(file.file_id, file.file_name));
    handleClose();
  };

  const handleOpen = () => {
    props.closeMenu();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <GetAppIcon />
        </ListItemIcon>
        <Typography variant="inherit" className={classes.menuItem}>
          ดาวน์โหลด
        </Typography>
      </MenuItem>
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
              <Typography className={classes.text}>
                คุณต้องการดาวน์โหลด {file.file_name} ?
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
