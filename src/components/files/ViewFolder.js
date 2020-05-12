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

const ViewFolder = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);
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
                                      },
                                    }}
                                  >
                                    <Grid
                                      container
                                      className={classes.iconAlign}
                                    >
                                      <Grid item></Grid>
                                      <Grid item xs={1}>
                                        <FolderIcon
                                          className={classes.iconFolderTable}
                                        />
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
                    {loading && (
                      <div className={classes.loading}>
                        <Circular />
                      </div>
                    )}
                  </Paper>
                </Grid>
              </Fragment>
            ) : (
              <Redirect to={"/notfound"} />
            )
            //history.push('/viewfolderamin')
          }
        </div>
      )}
    </div>
  );
};

export default ViewFolder;
