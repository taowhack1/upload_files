import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
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
import { getAllFoldersAdmin } from "../../actions/folderActions";
import PersonIcon from "@material-ui/icons/Person";
import useStyles from "./StyleFiles";
import Circular from "../layout/Circular";
import MenuUserCheckUpload from "./MenuUserCheckUpload";
import MenuUserSecondSwitch from "./MenuUserSecondSwitch";

import { useSnackbar } from "notistack";

const ManageUserSecond = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { authenticated, authdata } = useSelector((state) => state.auth);
  const { foldersadmin, loading } = useSelector((state) => state.folder);
  const history = useHistory();

  const dispatch = useDispatch();
  const { user_id, user_firstname, user_active } = "";
  const [userID, setUserID] = useState();
  const [userfirstname, setFirstname] = useState();
  const [userActive, setUserActive] = useState();
  useEffect(() => {
    if (props.location.state) {
      const { user_id, user_firstname, user_active } = props.location.state;
      setUserID(user_id);
      setFirstname(user_firstname);
      setUserActive(user_active);
      dispatch(getAllFoldersAdmin(user_id));
    } else if (!props.location.state) {
      if (authenticated) {
        if (authdata.authorized_id == 1) {
          history.push("/");
        }
        if (authdata.authorized_id == 2) {
          history.push("/manageuserfirst/");
        }
      }
    }
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
    <div>
      {props.location.state != null ? (
        <Fragment>
          <Grid container direction="row" justify="center" alignItems="center">
            <Paper className={classes.paper}>
              <Grid
                container
                direction="row"
                justify="left"
                alignItems="center"
              >
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
                <TableBody>
                  <TableRow>
                    <TableCell border={0} style={{ borderBottom: "0px" }}>
                      <Grid container className={classes.iconAlign}>
                        <Grid>
                          {userActive ? (
                            <PersonIcon className={classes.iconPersonTable} />
                          ) : (
                              <PersonIcon
                                className={classes.iconPersonTableUnActive}
                              />
                            )}
                        </Grid>
                        <Grid>
                          <Typography
                            color="textPrimary"
                            className={classes.text}
                          >
                            {userfirstname}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>

                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '70%' }} align="center" >
                      <Typography color="textPrimary" className={classes.text}>
                        ชื่อโฟลเดอร์
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
                  {!loading && foldersadmin !== null
                    ? foldersadmin.map((folder, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Grid container className={classes.iconAlign}>
                            <Grid >
                              <FolderIcon
                                className={classes.iconFolderTable}
                              />
                            </Grid>
                            <Grid >
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
                          userData={userID}
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
      ) : (
          <Redirect to="/manageuserfirst" />
        )}
    </div>
  );
};
export default ManageUserSecond;
