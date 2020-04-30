import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./upload_style.css";
import "./style.css";
import { Modal, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import useStyles from "./StyleFiles";
import axios from "axios";
const DeleteFiles = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

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
    const params = new URLSearchParams();
    params.append("file_id", 15);
    axios
      .delete("http://192.168.5.230:8080/upload/file/delete", params)
      .then((res) => {
        alert(res.data.success);
        if (res.data.success) {
          handleClose();
        }
      });
  };

  return (
    <div>
      <Tooltip onClick={handleOpen} title="ลบ" aria-label="add">
        <Fab color="primary" className={classes.absolute}>
          <RemoveIcon className={classes.icon} />
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
                  props.listDelFiles.map((listDelFile) => (
                    <Grid
                      container
                      className={classes.iconAlign}
                      key={listDelFile}
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
                          {listDelFile}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </div>
            <div className={classes.modalBtn}>
              <Button variant="contained" className={classes.modalbtnDel}>
                <Typography className={classes.text} onClick={handleDelete}>
                  Delete
                </Typography>
              </Button>
              <Button color="primary" className={classes.modalbtnCancel}>
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
