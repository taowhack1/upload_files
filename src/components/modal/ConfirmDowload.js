import React from "react";
import { useDispatch } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  Button,
  Typography,
  IconButton,
  Fade,
  Backdrop,
  Modal,
} from "@material-ui/core";
import useStyles from "../../style/StyleFiles";
import { download } from "../../actions/fileActions";
import Hidden from "@material-ui/core/Hidden";

export default function ConfirmDownload(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const filename = props.filename;
  const fileId = props.fileid;

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
      <Hidden xsDown>
        <IconButton className={classes.tableMargin} onClick={handleOpen}>
          <GetAppIcon />
        </IconButton>
      </Hidden>
      <Hidden smUp>
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
                  <Typography className={classes.text}>ดาวน์โหลด</Typography>
                </Button>
                <Button
                  color="primary"
                  className={classes.modalbtnCancel}
                  onClick={handleClose}
                >
                  <Typography className={classes.text}>ยกเลิก</Typography>
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
