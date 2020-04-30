import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Breadcrumbs,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Checkbox,
} from "@material-ui/core/";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CreateIcon from "@material-ui/icons/Create";
import GetAppIcon from "@material-ui/icons/GetApp";
import RemoveIcon from "@material-ui/icons/Remove";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { getFolders } from "../../actions/folderActions";
import PersonIcon from "@material-ui/icons/Person";
import AddUser from "./AddUser";
import useStyles from "./StyleFiles";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

const ManageUserSecond = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [checked, setChecked] = React.useState(true);

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleMoreVertIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreVertIconClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFolders(localStorage.getItem("user_id")));
  }, []);

  const handleRowClick = (folder_id) => {
    console.log(folder_id);
  };

  if (loading) {
    console.log("loading >>> " + loading);
  }

  return (
    <Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={
                <NavigateNextIcon className={classes.NavigateNextIcon} />
              }
              aria-label="breadcrumb"
            >
              <Link to={{ pathname: "/manageuser" }}>
                <Typography className={classes.opacity} color="textPrimary">
                  จัดการผู้ใช้งาน
                </Typography>
              </Link>
              <Link to={{ pathname: "/manageuserfirst" }}>
                <Typography className={classes.opacity} color="textPrimary">
                  โฟลเดอร์
                </Typography>
              </Link>
              <Typography className={classes.text} color="textPrimary">
                สิทธิ์การใช้งาน
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellName}>
                  <Typography color="textPrimary" className={classes.text}>
                    ชื่อ
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text}>
                    ดาวน์โหลด
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text}>
                    อัพโหลด
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text}>
                    ตัวเลือก
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {!loading && folders !== null
                            ? folders.map((row) => ( */}
              <TableRow>
                <TableCell>
                  <Link
                  //component={Link}
                  // to={{
                  //     pathname:
                  //         "/ViewFiles/" + row.folder_id + row.folder_name,
                  // }}
                  >
                    <Grid container className={classes.iconAlign}>
                      <Grid item></Grid>
                      <Grid item xs={1}>
                        <PersonIcon className={classes.iconPersonTable} />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography
                          color="textPrimary"
                          className={classes.text}
                        >
                          นาง A
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                  {/* </Link> */}
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    name="cbUpload"
                    className={classes.tableMargin}
                    //checked={checked}
                    onChange={handleCheckBoxChange}
                    inputProps={{ "aria-label": "Allow Upload" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    name="cbDownload"
                    className={classes.tableMargin}
                    //checked={checked}
                    onChange={handleCheckBoxChange}
                    inputProps={{ "aria-label": "Allow Download" }}
                  />
                </TableCell>
                <TableCell align="center">
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
                    <MenuItem>
                      <ListItemIcon>
                        <RemoveIcon />
                      </ListItemIcon>
                      <Typography
                        variant="inherit"
                        className={classes.menuItem}
                      >
                        ลบ
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <CreateIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography
                        variant="inherit"
                        className={classes.menuItem}
                      >
                        แก้ไข
                      </Typography>
                    </MenuItem>
                  </Menu>
                </TableCell>
                <TableCell align="center">
                  <Link to="/manageuserfirst">
                    <IconButton className={classes.tableMargin}>
                      <NavigateBefore></NavigateBefore>
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
              {/* ))
                            : console.log("Nodata")} */}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default ManageUserSecond;
