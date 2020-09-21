import React, { Fragment, useState } from "react";
import {
  Modal,
  Typography,
  Backdrop,
  Fade,
  Fab,
  Tooltip,
  Button,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../../style/StyleFiles";

const ConfirmDeleteFiles = (props) => {
  const { listDelFiles } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const listDel = listDelFiles;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        onClick={() => {
          handleOpen();
        }}
        title="ลบ"
        aria-label="add"
      >
        <Fab color="primary" className={classes.absolute}>
          <DeleteIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              <Typography className={classes.text}>เอกสารที่เลือก</Typography>
              <div className={classes.modalIconAlign}>
                {listDel &&
                  listDel.map((listDelFile, index) => {
                    return (
                      <Grid container className={classes.iconAlign} key={index}>
                        <Grid item xs></Grid>
                        <Grid item xs={10} className={classes.iconCheck}>
                          <Typography className={classes.text}>
                            {listDelFile.file_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
              </div>
            </div>
            <div className={classes.modalBtn}>
              <Button
                variant="contained"
                className={classes.modalbtnDel}
                onClick={() => {
                  props.handleDelete(listDel);
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
        </Fade>
      </Modal>
    </div>
  );
};
export default ConfirmDeleteFiles;
