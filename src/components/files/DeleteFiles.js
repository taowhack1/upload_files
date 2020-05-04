import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./StyleFiles";
import axios from "axios";


const DeleteFiles = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const listDel = props.listDelFiles

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    for (let i = 0; i < listDel.length; i++) {
      const list = listDel[i]
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          file_id: list.file_id,
        },
      };
      try {
        const res = axios.delete(`http://192.168.5.230:8080/upload/file/delete`, config);
        console.log(res.data);
      } catch (err) {
        console.log('deleteFile Error >>>');
      }
      console.log('deleteFile Render >>>');
      handleClose();
    }
    alert('Delete SUccess')
    props.refresh()
  };


  return (
    <div>
      <Tooltip onClick={handleOpen} title="ลบ" aria-label="add">
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
                {props.listDelFiles &&
                  props.listDelFiles.map((listDelFile, index) => (
                    <Grid
                      container
                      className={classes.iconAlign}
                      key={index}
                    >
                      <Grid item xs></Grid>
                      <Grid item xs={1}>
                        {" "}
                        <Checkbox
                          className={classes.iconCheck}
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography className={classes.text}>
                          {listDelFile.file_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </div>
            <div className={classes.modalBtn}>
              <Button variant="contained" className={classes.modalbtnDel} >
                <Typography className={classes.text} onClick={handleDelete}>
                  Delete
                </Typography>
              </Button>
              <Button color="primary" className={classes.modalbtnCancel} onClick={handleClose}>
                <Typography className={classes.text}>Cancel</Typography>
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default DeleteFiles;

