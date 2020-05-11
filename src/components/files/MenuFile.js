import React, { useState } from "react";

import {
  Modal,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@material-ui/core/";
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
import ConfirmDeleteFile from "./ConfirmDeleteFile";
import ConfirmDownloadAdmin from "./ConfirmDowloadAdmin";
const MenuFile = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState({ ...props.file });
  const handleMoreVertIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreVertIconClose = () => {
    setAnchorEl(null);
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
        <ConfirmDeleteFile
          file={file}
          handleDelete={props.handleDelete}
          closeMenu={handleMoreVertIconClose}
        />
        <MenuItem>
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" className={classes.menuItem}>
            แก้ไข
          </Typography>
        </MenuItem>
        <ConfirmDownloadAdmin file={file} closeMenu={handleMoreVertIconClose} />
      </Menu>
    </div>
  );
};
export default MenuFile;
