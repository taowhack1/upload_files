import React, { useState } from "react";

import {
  Modal,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core/";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CreateIcon from "@material-ui/icons/Create";
import GetAppIcon from "@material-ui/icons/GetApp";
import RemoveIcon from "@material-ui/icons/Remove";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./StyleFiles";
import "./upload_style.css";
import "./style.css";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import FolderIcon from "@material-ui/icons/Folder";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ConfirmDelete from "./ConfirmDeleteFolder";
import Hidden from '@material-ui/core/Hidden';
const MenuFolder = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState({
    folder_id: props.folder_id,
    folder_name_old: props.folder_name_old,
    folder_name: props.folder_name,
  });
  const handleEditFolderOpen = () => {
    handleMoreVertIconClose();
    setOpen(true);
  };

  const handleEditFolderClose = (callback) => {
    setOpen(false);
    if (callback) {
      setFolder({
        ...folder,
        folder_name_old: folder.folder_name,
      });
    }
  };
  const handleMoreVertIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreVertIconClose = () => {
    setAnchorEl(null);
  };
  const handleChangeFolderName = (e) => {
    let value = e.target.value.replace(/[^A-Za-z\d]$/gi, "");
    value = value.slice(0, 15);
    setFolder({
      ...folder,
      folder_name: value,
    });
  };
  const handleRenameSave = () => {
    props.edit(folder, handleEditFolderClose);
  };
  return (
    <div>
      <IconButton
        className={classes.tableMargin}
        onClick={handleMoreVertIconClick}
      >
        <MoreVertIcon></MoreVertIcon>
      </IconButton>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleMoreVertIconClose}
      >
        <ConfirmDelete
          folder={folder}
          delete={props.delete}
          closeModal={handleMoreVertIconClose}
        />
        <MenuItem onClick={handleEditFolderOpen}>
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" className={classes.menuItem}>
            แก้ไข
          </Typography>
        </MenuItem>
        <Modal
          className={classes.modal}
          disableAutoFocus={true}
          outline="none"
          open={open}
          onClose={handleEditFolderClose}
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
                  เปลี่ยนชื่อโฟลเดอร์
                </Typography>
                <div className={classes.modalIconAlign}>
                  <Grid container className={classes.iconAlign}>
                    <Hidden xsDown>
                      <Grid item xs>
                        {" "}
                      </Grid>
                      <Grid item sm={1}>
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
                          value={folder.folder_name}
                          InputProps={{
                            classes: { input: classes.input },
                          }}
                        ></TextField>
                      </Grid>
                      <Grid item xs>
                        {" "}
                      </Grid>
                    </Hidden>
                    <Hidden smUp>
                      <TextField
                        placeholder="ชื่อโฟลเดอร์"
                        type="search"
                        variant="outlined"
                        className={classes.textField}
                        onChange={handleChangeFolderName}
                        value={folder.folder_name}
                        InputProps={{
                          classes: { input: classes.input },
                        }}
                      ></TextField>
                    </Hidden>
                  </Grid>
                </div>
              </div>

              <div className={classes.modalBtn}>
                <Button
                  variant="contained"
                  className={classes.modalbtnOk}
                  onClick={handleRenameSave}
                >
                  <Typography
                    className={classes.text}
                    color="textPrimary"
                    elevation={0}
                  >
                    SAVE
                  </Typography>
                </Button>
                <Button
                  color="primary"
                  className={classes.modalbtnCancel}
                  onClick={handleEditFolderClose}
                >
                  <Typography className={classes.text} color="textPrimary">
                    Cancel
                  </Typography>
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
        <MenuItem>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <Typography variant="inherit" className={classes.menuItem}>
            ดาวน์โหลด
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MenuFolder;
