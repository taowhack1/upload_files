import React, { useState } from "react";

import {
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@material-ui/core/";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./StyleFiles";
import "./upload_style.css";
import "./style.css";
import ConfirmDeleteFile from "./ConfirmDeleteFile";
import ConfirmDownloadAdmin from "./ConfirmDowloadAdmin";
import Hidden from '@material-ui/core/Hidden';
const MenuFile = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState({ ...props.file });
  const handleMoreVertIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreVertIconClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Hidden smDown >
        <IconButton
          className={classes.tableMargin}
          onClick={handleMoreVertIconClick}
        >
          <MoreVertIcon></MoreVertIcon>
        </IconButton>
      </Hidden>
      <Hidden mdUp >
        <IconButton
          className={classes.iconButton}
          onClick={handleMoreVertIconClick}
        >
          <MoreVertIcon></MoreVertIcon>
        </IconButton>

      </Hidden>
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
