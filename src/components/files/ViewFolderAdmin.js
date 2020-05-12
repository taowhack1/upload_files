import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import moment from "moment";
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
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FolderIcon from "@material-ui/icons/Folder";
import {
  deleteFolder,
  updateFolder,
  getAllFolder,
  createFolder,
} from "../../actions/folderActions";
import AddFolder from "./AddFolder";
import useStyles from "./StyleFiles";
import MenuFolder from "./MenuFolder";
import Circular from '../layout/Circular'
import MenuFolder2 from "./MenuFile";
import { useSnackbar } from "notistack";
import swal from "sweetalert";

const ViewFolderAdmin = (props) => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);
  const { authenticated, authdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    //console.log("useEffect Running");
    dispatch(getAllFolder());
  }, []);

  const snackAlert = (msg = "Alert", variant = "warning") => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };

  const refresh = () => {
    dispatch(getAllFolder());
    console.log("refresh");
  };

  const handleDeleteFolder = async (folderId) => {
    await dispatch(deleteFolder(folderId, snackAlert));
  };
  const handleCreateFolder = async (folder_name, handleAddFolderClose) => {
    if (folder_name) {
      await dispatch(
        createFolder(folder_name, snackAlert, handleAddFolderClose)
      );
    } else {
      snackAlert("กรุณาระบุชื่อโฟลเดอร์ที่ต้องการสร้าง", "error");
    }
  };
  const handleChangeFolderName = async (folder, handleAddFolderClose) => {
    if (folder.folder_name) {
      await dispatch(updateFolder(folder, snackAlert));
      handleAddFolderClose(true);
    } else {
      snackAlert("กรุณาระบุชื่อโฟลเดอร์", "warning");
    }
  };
  return (
    <div>
      {authenticated &&
        <div>
          {authdata.authorized_id == 2
            ?
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
                      {!loading && folders != null
                        ? folders.map((folder) => (
                          <TableRow key={folder.folder_id}>
                            <TableCell>
                              <Link
                                to={{
                                  pathname:
                                    "/viewfilesadmin/" +
                                    folder.folder_id +
                                    folder.folder_name,
                                }}
                              >
                                <Grid container className={classes.iconAlign}>
                                  <Grid item></Grid>
                                  <Grid item xs={1}>
                                    <FolderIcon className={classes.iconFolderTable} />
                                  </Grid>

                                  <Grid item xs={10}>
                                    <Typography className={classes.text}>
                                      {folder.folder_name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Link>
                            </TableCell>
                            <TableCell align="center">
                              <Typography className={classes.text}>
                                {moment(folder.folder_created).format(
                                  "DD-MM-YYYY HH:MM"
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <MenuFolder
                                delete={handleDeleteFolder}
                                edit={handleChangeFolderName}
                                snackAlert={snackAlert}
                                refresh={refresh}
                                folder_name_old={folder.folder_name}
                                folder_name={folder.folder_name}
                                folder_id={folder.folder_id}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                        : console.log("Nodata")}
                    </TableBody>
                  </Table>
                  {loading && (
                    <div className={classes.loading}>
                      <Circular />
                    </div>
                  )}
                </Paper>
                <AddFolder handleCreateFolder={handleCreateFolder} />
              </Grid>
            </Fragment>
            : <Redirect to="/" />
          }
        </div>
      }
    </div>
  );
};
export default ViewFolderAdmin;
