import React, { useEffect, Fragment ,useState} from "react";
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
  Button,
  Grid,
  Breadcrumbs,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core/";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CreateIcon from "@material-ui/icons/Create";
import GetAppIcon from "@material-ui/icons/GetApp";
import RemoveIcon from "@material-ui/icons/Remove";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FolderIcon from "@material-ui/icons/Folder";
import { getFolders,deleteFolder,getAllFolder } from "../../actions/folderActions";
import AddFolder from "./AddFolder";
import useStyles from "./StyleFiles";
import MenuFolder from "./MenuFolder";
import axios from "axios";

const ViewFolderAdmin = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);
  const [anchorEl, setAnchorEl] = useState(null);
  const { authdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    authdata.authorized_id == 2 ? dispatch(getAllFolder()) : 
    dispatch(getFolders(authdata.user_id));
  }, []);
  const handleRowClick = (folder_id) => {
    console.log(folder_id);
  };

  if (loading) {
    console.log("loading >>> " + loading);
  }
  const deleteFolder = (folder_id) => {
    console.log(folder_id)
    dispatch(deleteFolder(folder_id));
  }
  const refresh = () =>{
    dispatch(getAllFolder());
  }
  return (
    <Fragment>
      <Grid container className={classes.gridContainer}>
        <Paper className={classes.paper}>
          <Grid container>
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={
                <NavigateNextIcon className={classes.NavigateNextIcon} />
              }
              aria-label="breadcrumb"
            >
              <Typography className={classes.text}>โฟลเดอร์ทั้งหมด</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellName}>
                  <Typography className={classes.text}>ชื่อ</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.text}>วันที่แก้ไข</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.text}>ตัวเลือก</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && folders !== null
                ? folders.map((row) => (
                    <TableRow key={row.folder_id}>
                      <TableCell>
                        <Link
                          //component={Link}
                          to={{
                            pathname:
                              "/viewfilesadmin/" +
                              row.folder_id +
                              row.folder_name,
                            //         "/ViewFiles/" + row.folder_id + row.folder_name,
                          }}
                        >
                          <Grid container className={classes.iconAlign}>
                            <Grid item></Grid>
                            <Grid item xs={1}>
                              <FolderIcon className={classes.iconFolderTable} />
                            </Grid>
                            <Grid item xs={10}>
                              <Typography className={classes.text}>
                                {row.folder_name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                        {/* </Link> */}
                      </TableCell>
                      <TableCell align="center">
                        <Typography className={classes.text}>
                          {moment(row.folder_created).format(
                            "DD-MM-YYYY HH:MM"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <MenuFolder deleteFolder={deleteFolder} listRowFolder={row.folder_id} />
                      </TableCell>
                    </TableRow>
                  ))
                : console.log("Nodata")}
            </TableBody>
          </Table>
        </Paper>
        <AddFolder  refresh={refresh}/>
      </Grid>
    </Fragment>
  );
};
export default ViewFolderAdmin;
