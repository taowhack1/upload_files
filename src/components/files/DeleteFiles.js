import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./StyleFiles";
import axios from "axios";


const DeleteFiles = (props) => {
  const classes = useStyles();
  const { listDelFiles, refresh } = props
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const listDel = listDelFiles
  const [selected, setSelected] = React.useState([]);
  const [index, setIndex] = React.useState([]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  console.log(selected)


  const dispatch = useDispatch();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    for (let i = 0; i < selected.length; i++) {
      const list = selected[i]
      await dispatch(deleteFile(list));
    }
    handleClose()
    refresh()
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

                          onClick={(event) =>
                            handleClick(event, listDelFile.file_id)
                          }
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


