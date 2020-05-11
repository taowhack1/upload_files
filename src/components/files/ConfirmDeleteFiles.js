import React, { useEffect, Fragment, useState } from "react";
import { deleteFile } from "../../actions/fileActions";
import "./upload_style.css";
import "./style.css";
import { Modal, Typography, Select } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./StyleFiles";
import axios from "axios";
import { useDispatch } from "react-redux";

const ConfirmDeleteFiles = (props) => {
  const { refresh, listDelFiles } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const listDel = listDelFiles;
  const dispatch = useDispatch();

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
                        <Grid item xs={1}>
                          {/* <Checkbox
                            className={classes.iconCheck}
                            checked={checked}
                            onClick={(event) =>
                              handleClick(event, listDelFile.file_id, listDelFile.file_name)
                            }
                          //onChange={(event) => changStatus(event)}
                          /> */}
                        </Grid>
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
                <Typography className={classes.text}>Delete</Typography>
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
        </Fade>
      </Modal>
    </div>
  );
};
export default ConfirmDeleteFiles;
