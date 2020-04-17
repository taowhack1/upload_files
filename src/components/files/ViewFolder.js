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

import FolderIcon from "@material-ui/icons/Folder";
import { getFolders } from "../../actions/folderActions";

const useStyles = makeStyles({
  paper: {
    width: "90%",
    boxShadow: "0 0 0 0",
    color: "white",
  },
  table: {
    width: "100%",
  },
  color: {
    color: "#FCD462",
  },
});

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
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Typography color="textPrimary" variant="h6">
                โฟล์เดอร์ของฉัน
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">ชื่อ</TableCell>
                <TableCell align="left">วันที่แก้ไขล่าสุด</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && folders !== null
                ? folders.map((row) => (
                    <TableRow key={row.folder_id}>
                      <TableCell>
                        <Button
                          component={Link}
                          to={{
                            pathname:
                              "/ViewFiles/" + row.folder_id + row.folder_name,
                          }}
                        >
                          <FolderIcon className={classes.color} />
                          &nbsp;&nbsp;{row.folder_name}
                        </Button>
                        {/* </Link> */}
                      </TableCell>
                      <TableCell align="left">{row.folder_created}</TableCell>
                    </TableRow>
                  ))
                : console.log("Nodata")}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default ViewFolder;
