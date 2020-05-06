import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  TextField,
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FolderIcon from "@material-ui/icons/Folder";
import {
  deleteFolder,
  updateFolder,
  getAllFolder,
} from "../../actions/folderActions";
import AddFolder from "./AddFolder";
import useStyles from "./StyleFiles";
import MenuFolder from "./MenuFolder";
import CircularProgress from "@material-ui/core/CircularProgress";

const ViewFolderAdmin = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);
  const { authdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [folder_name, setFolder_name] = useState();
  useEffect(() => {
    dispatch(getAllFolder());
  }, []);

  if (loading) {
    console.log("loading >>> " + loading);
  }
  const refresh = () => {
    dispatch(getAllFolder());
    //setEdit(!edit)
    console.log("refresh");
  };
  const handleDelete = async (folderId) => {
    // handleMoreVertIconClose();
    console.log("delete : " + folderId);
    await dispatch(deleteFolder(folderId));
    await dispatch(getAllFolder());
  };
  const handleRename = async (folder) => {
    await dispatch(updateFolder(folder));
    // handleAddFolderClose();
    await dispatch(getAllFolder());
  };
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
              {!loading && folders != null
                ? folders.map((folder) => (
                    <TableRow key={folder.folder_id}>
                      <TableCell>
                        <Link
                          //component={Link}
                          to={{
                            pathname: "/viewfilesadmin/" + folder.folder_id,
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
                        {/* </Link> */}
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
                          rename={handleRename}
                          delete={handleDelete}
                          refresh={refresh}
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
              <CircularProgress />
            </div>
          )}
        </Paper>
        <AddFolder refresh={refresh} />
      </Grid>
    </Fragment>
  );
};
export default ViewFolderAdmin;
