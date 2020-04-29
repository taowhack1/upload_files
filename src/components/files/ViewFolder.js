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
  Button,
  Grid,
  Breadcrumbs,
  Typography,
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CircularProgress from '@material-ui/core/CircularProgress';

import FolderIcon from "@material-ui/icons/Folder";
import { getFolders } from "../../actions/folderActions";
import useStyles from './StyleFiles'

const ViewFolder = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);

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
      <Grid container container className={classes.gridContainer}>
        <Paper className={classes.paper}>
          <Grid container >
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon />}
              aria-label="breadcrumb"
            >
              <Typography className={classes.text} color="textPrimary">โฟลเดอร์ทั้งหมด</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell className={classes.tableCellName}>
                <Typography color="textPrimary" className={classes.text} >
                  ชื่อ
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textPrimary" className={classes.text} >
                  วันที่แก้ไข
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textPrimary" className={classes.text} >

                </Typography>
              </TableCell>

            </TableHead>
            <TableBody>
              {!loading && folders !== null
                ? folders.map((row) => (
                  <TableRow key={row.folder_id}>
                    <TableCell>
                      <Link
                        to={{
                          pathname:
                            "/ViewFiles/" + row.folder_id + row.folder_name,
                        }}
                      >
                        <Grid container className={classes.iconAlign}>
                          <Grid item></Grid>
                          <Grid item xs={1}>
                            <FolderIcon className={classes.iconFolderTable} />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography className={classes.text} >
                              {row.folder_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
                      {/* </Link> */}
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textPrimary" className={classes.text} >
                        {moment(row.folder_created).format("DD-MM-YYYY HH:MM")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))
                : console.log("Nodata")}
            </TableBody>
          </Table>
          {loading &&
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          }
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default ViewFolder;
