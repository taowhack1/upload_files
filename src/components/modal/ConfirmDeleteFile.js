import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Typography, MenuItem } from "@material-ui/core";
import useStyles from "../../style/StyleFiles";
import RemoveIcon from "@material-ui/icons/Remove";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function ConfirmDeleteFile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const file = props.file;
  console.log(file);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MenuItem
        onClick={() => {
          props.closeMenu();
          handleOpen();
        }}
      >
        <ListItemIcon>
          <RemoveIcon />
        </ListItemIcon>
        <Typography variant="inherit" className={classes.menuItem}>
          ลบ
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
                คุณต้องการลบ {file.file_name} ?
              </Typography>
              <div className={classes.modalBtn}>
                <Button
                  variant="contained"
                  className={classes.modalbtnDel}
                  onClick={async () => {
                    await props.handleDelete([file]);
                    handleClose();
                  }}
                >
                  <Typography className={classes.text}>ลบ</Typography>
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
