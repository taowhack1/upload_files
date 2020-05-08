import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
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
import FolderIcon from "@material-ui/icons/Folder";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { getAllFolder, getFolders } from "../../actions/folderActions";
import useStyles from "./StyleFiles";
import Circular from "../layout/Circular";
import MenuUserCheckUpload from "./MenuUserCheckUpload";
import { useSnackbar } from "notistack";

const ManageUserSecond = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const { user_id } = useParams();

  const decoded = jwt.verify(user_id, "1234");

  const { folders, loading } = useSelector((state) => state.folder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFolders(decoded.user_id));
  }, []);

  const snackAlert = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };

  if (loading) {
    return <Circular />;
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
              <Link to={{ pathname: "/manageuserfirst" }}>
                <Typography className={classes.opacity} color="textPrimary">
                  จัดการผู้ใช้งาน
                </Typography>
              </Link>
              <Typography className={classes.text} color="textPrimary">
                ตั้งค่าการใช้งาน
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
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && folders !== null
                ? folders.map((folder, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Grid container className={classes.iconAlign}>
                          <Grid item></Grid>
                          <Grid item xs={1}>
                            <FolderIcon className={classes.iconFolderTable} />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography
                              color="textPrimary"
                              className={classes.text}
                            >
                              {folder.folder_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <MenuUserCheckUpload
                        userData={user_id}
                        folderData={folder}
                        snackAlert={snackAlert}
                      />
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
export default ManageUserSecond;
