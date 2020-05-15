import React, { useState } from "react";
import {
  Modal,
  Typography,
  Backdrop,
  Fade,
  Fab,
  Tooltip,
  Button,
  TextField,
  Grid,
  Hidden,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/Folder";
import useStyles from "../../style/StyleFiles";
export default function AddFolder(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [folder_name, setFolderName] = useState("");
  const handleAddFolderOpen = () => {
    setOpen(true);
  };
  const handleAddFolderClose = () => {
    setOpen(false);
    setFolderName("");
  };

  const handleChangeFolderName = (e) => {
    let value = e.target.value.replace(/[^A-Za-z\d]$/gi, "");
    value = value.slice(0, 15);
    setFolderName(value);
  };

  return (
    <div>
      <Tooltip
        onClick={handleAddFolderOpen}
        title="เพิ่มโฟลเดอร์"
        aria-label="add"
      >
        <Fab color="primary" className={classes.absolute}>
          <AddIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Modal
        className={classes.modal}
        disableAutoFocus={true}
        outline="none"
        open={open}
        onClose={handleAddFolderClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <div className={classes.root}>
              <Typography className={classes.text} color="textPrimary">
                สร้างโฟลเดอร์
              </Typography>
              <div className={classes.modalIconAlign}>
                <Grid container className={classes.iconAlign}>
                  <Hidden xsDown>
                    <Grid item xs>
                      {" "}
                    </Grid>
                    <Grid>
                      <FolderIcon className={classes.iconFolder} />
                    </Grid>
                    <Grid item> </Grid>
                    <Grid item xs={7}>
                      <TextField
                        placeholder="ชื่อโฟลเดอร์"
                        type="search"
                        variant="outlined"
                        className={classes.textField}
                        onChange={handleChangeFolderName}
                        value={folder_name}
                        InputProps={{
                          classes: { input: classes.input },
                        }}
                      />
                    </Grid>
                    <Grid item xs>
                      {" "}
                    </Grid>
                  </Hidden>
                  <Hidden smUp>
                    <Grid container className={classes.iconAlign}>
                      <TextField
                        placeholder="ชื่อโฟลเดอร์"
                        type="search"
                        variant="outlined"
                        className={classes.textField}
                        onChange={handleChangeFolderName}
                        value={folder_name}
                        InputProps={{
                          classes: { input: classes.input },
                        }}
                      />
                    </Grid>
                  </Hidden>
                </Grid>
              </div>
            </div>

            <div className={classes.modalBtn}>
              <Button
                variant="contained"
                className={classes.modalbtnSave}
                onClick={() =>
                  props.handleCreateFolder(folder_name, handleAddFolderClose)
                }
              >
                <Typography
                  className={classes.text}
                  color="textPrimary"
                  elevation={0}
                >
                  ตกลง
                </Typography>
              </Button>
              <Button
                color="primary"
                className={classes.modalbtnCancel}
                onClick={handleAddFolderClose}
              >
                <Typography className={classes.text} color="textPrimary">
                  ยกเลิก
                </Typography>
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
