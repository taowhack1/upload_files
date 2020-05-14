import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
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
import Circular from "../layout/Circular";
import { getFolders } from "../../actions/folderActions";
import useStyles from "./StyleFiles";
import dateTH from "./function";
import Hidden from '@material-ui/core/Hidden';

const ViewFolder = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);
  console.log(folders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFolders(authdata.user_id));
  }, []);
  const { authenticated, authdata } = useSelector((state) => state.auth);
  if (loading) {
    console.log("loading >>> " + loading);
  }

  return (
    <div>
      {authenticated && (
        <div>
          {
            authdata.authorized_id == 1 ? (
              <Fragment>
                <Grid container container className={classes.gridContainer}>
                  <Paper className={classes.paper}>
                    <Grid container>
                      <Breadcrumbs
                        className={classes.breadcrumbs}
                        separator={<NavigateNextIcon />}
                        aria-label="breadcrumb"
                      >
                        <Typography
                          className={classes.text}
                          color="textPrimary"
                        >
                          โฟลเดอร์ทั้งหมด
                        </Typography>
                      </Breadcrumbs>
                    </Grid>
                  </Paper>
                  <Paper className={classes.paper}>
                    <Hidden smDown>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableCell className={classes.tableCellName}>
                            <Typography
                              color="textPrimary"
                              className={classes.text}
                            >
                              ชื่อ
                          </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              color="textPrimary"
                              className={classes.text}
                            >
                              วันที่แก้ไข
                          </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              color="textPrimary"
                              className={classes.text}
                            ></Typography>
                          </TableCell>
                        </TableHead>
                        <TableBody>
                          {!loading && folders !== null
                            ? folders.map((folder) => (
                              <TableRow key={folder.folder_id}>
                                <TableCell>
                                  <Link
                                    to={{
                                      pathname:
                                        "/ViewFiles/" + folder.folder_id,
                                      state: {
                                        folder_id: folder.folder_id,
                                        folder_name: folder.folder_name,
                                        access_upload: folder.access_upload,
                                        access_download: folder.access_download,
                                      },
                                    }}
                                  >
                                    <Grid
                                      container
                                      className={classes.iconAlign}
                                    >
                                      <FolderIcon
                                        className={classes.iconFolderTable}
                                      />
                                      <Typography className={classes.text}>
                                        {folder.folder_name}
                                      </Typography>
                                    </Grid>
                                  </Link>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography
                                    color="textPrimary"
                                    className={classes.text}
                                  >
                                    {moment
                                      .utc(folder.folder_updated)
                                      .add(3, "minutes")
                                      .format("DD-MM-YYYY HH:mm")}
                                  </Typography>
                                </TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            ))
                            : console.log("Nodata")}
                        </TableBody>
                      </Table>
                    </Hidden>
                    <Hidden mdUp>
                      <Table>
                        <TableBody>
                          {!loading && folders !== null
                            ? folders.map((folder) => (
                              <TableRow key={folder.folder_id}>
                                <TableCell>
                                  <Link
                                    to={{
                                      pathname:
                                        "/ViewFiles/" + folder.folder_id,
                                      state: {
                                        folder_id: folder.folder_id,
                                        folder_name: folder.folder_name,
                                        access_upload: folder.access_upload,
                                        access_download: folder.access_download,
                                      },
                                    }}
                                  >
                                    <Grid container className={classes.iconAlign}>
                                      <Grid>
                                        <FolderIcon
                                          className={classes.iconFolderTable}
                                        />
                                      </Grid>
                                      <Grid >
                                        <Typography className={classes.nowrapText}>
                                          {folder.folder_name}
                                        </Typography>
                                        <Typography className={classes.textDate}>
                                          {moment
                                            .utc(folder.folder_updated)
                                            .add(3, "minutes")
                                            .format("DD-MM-YYYY HH:mm")}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))
                            : console.log("Nodata")}
                        </TableBody>
                      </Table>
                    </Hidden>
                    {folders === null ? (
                      <Table>
                        <TableRow>
                          <TableCell className={classes.emptyTable}>
                            <Typography>
                              {" ไม่พบโฟลเดอร์ที่มีสิทธิ์เข้าถึง "}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Table>
                    ) : (
                        console.log("folder empty")
                      )}
                    {loading && (
                      <div className={classes.loading}>
                        <Circular />
                      </div>
                    )}
                  </Paper>
                </Grid>
              </Fragment>
            ) : (
                <Redirect to={"/viewfolderadmin"} />
              )
            //history.push('/viewfolderamin')
          }
        </div>
      )}
    </div>
  );
};

export default ViewFolder;
