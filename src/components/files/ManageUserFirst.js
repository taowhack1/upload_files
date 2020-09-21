import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Circular from "../layout/Circular";
import { getUserAll } from "../../actions/authActions";
import Registor from "../authen/Registor";
import useStyles from "../../style/StyleFiles";
import MenuUser from "../menu/MenuUser";
import ManageUserSwitchAuth from "../menu/ManageUserSwitchAuth";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PersonIcon from "@material-ui/icons/Person";
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
  IconButton,
} from "@material-ui/core/";
import { useSnackbar } from "notistack";
import StarIcon from "@material-ui/icons/Star";
import Hidden from "@material-ui/core/Hidden";
const ManageUserFirst = () => {
  const classes = useStyles();
  const { loading, users } = useSelector((state) => state.auth);
  const { authenticated, authdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const snackAlert = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };

  useEffect(() => {
    dispatch(getUserAll());
  }, []);

  if (loading) {
    return <Circular />;
  }
  const updateUser = () => {
    dispatch(getUserAll());
  };

  return (
    <div>
      {authenticated && (
        <div>
          {authdata.authorized_id == 2 ? (
            <Fragment>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Paper className={classes.paper}>
                  <Grid container>
                    <Breadcrumbs
                      className={classes.breadcrumbs}
                      separator={
                        <NavigateNextIcon
                          className={classes.NavigateNextIcon}
                        />
                      }
                      aria-label="breadcrumb"
                    >
                      <Typography className={classes.text}>
                        จัดการผู้ใช้งาน
                      </Typography>
                    </Breadcrumbs>
                  </Grid>
                </Paper>

                <Paper className={classes.paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableCellName}>
                          <Typography
                            color="textPrimary"
                            className={classes.text}
                          >
                            ชื่อผู้ใช้งาน
                          </Typography>
                        </TableCell>
                        <TableCell style={{ width: "20%" }} align="center">
                          <Typography
                            color="textPrimary"
                            className={classes.text}
                          >
                            สิทธิ์ผู้ดูแลระบบ
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            color="textPrimary"
                            className={classes.text}
                          >
                            สิทธิ์การใช้งาน
                          </Typography>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users !== null
                        ? users.map((user, index) => (
                            <TableRow key={index}>
                              <Hidden xsDown>
                                <TableCell>
                                  {/* authorized_id : 1 = user, 2 = Admin */}
                                  {user.authorized_id === 1 &&
                                  user.user_active === true ? (
                                    <Link
                                      to={{
                                        pathname:
                                          "/manageusersecond/" + user.user_id,
                                        state: {
                                          user_id: user.user_id,
                                          user_firstname: user.user_firstname,
                                          user_active: user.user_active,
                                        },
                                      }}
                                    >
                                      <Grid
                                        container
                                        className={classes.iconAlign}
                                      >
                                        <Grid>
                                          {user.user_active ? (
                                            <PersonIcon
                                              className={
                                                classes.iconPersonTable
                                              }
                                            />
                                          ) : (
                                            <PersonIcon
                                              className={
                                                classes.iconPersonTableUnActive
                                              }
                                            />
                                          )}
                                        </Grid>
                                        <Grid>
                                          <Typography
                                            color="textPrimary"
                                            className={classes.text}
                                          >
                                            {`${user.user_name}  ( ${user.user_firstname}  ${user.user_lastname} )`}
                                          </Typography>
                                        </Grid>
                                        <Grid>
                                          {user.authorized_id == 2 ? (
                                            <StarIcon
                                              className={classes.iconStar}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Link>
                                  ) : (
                                    <Grid
                                      container
                                      className={classes.iconAlign}
                                    >
                                      <Grid>
                                        {user.user_active ? (
                                          <PersonIcon
                                            className={classes.iconPersonTable}
                                          />
                                        ) : (
                                          <PersonIcon
                                            className={
                                              classes.iconPersonTableUnActive
                                            }
                                          />
                                        )}
                                      </Grid>
                                      <Grid>
                                        <Typography
                                          color="textPrimary"
                                          className={classes.text}
                                        >
                                          {`${user.user_name}  ( ${user.user_firstname}  ${user.user_lastname} )`}
                                        </Typography>
                                      </Grid>
                                      <Grid>
                                        {user.authorized_id == 2 ? (
                                          <StarIcon
                                            className={classes.iconStar}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </Grid>
                                    </Grid>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <ManageUserSwitchAuth
                                    userData={user}
                                    snackAlert={snackAlert}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <MenuUser
                                    userData={user}
                                    snackAlert={snackAlert}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {user.authorized_id === 2 ||
                                    (user.user_active && (
                                      <Link
                                        to={{
                                          pathname:
                                            "/manageusersecond/" + user.user_id,
                                          state: {
                                            user_id: user.user_id,
                                            user_firstname: user.user_firstname,
                                            user_active: user.user_active,
                                          },
                                        }}
                                      >
                                        <IconButton
                                          className={classes.tableMargin}
                                        >
                                          <NavigateNextIcon></NavigateNextIcon>
                                        </IconButton>
                                      </Link>
                                    ))}
                                </TableCell>
                              </Hidden>

                              <Hidden smUp>
                                <TableCell>
                                  {user.authorized_id === 1 &&
                                  user.user_active === true ? (
                                    <Link
                                      to={{
                                        pathname:
                                          "/manageusersecond/" + user.user_id,
                                        state: {
                                          user_id: user.user_id,
                                          user_firstname: user.user_firstname,
                                          user_active: user.user_active,
                                        },
                                      }}
                                    >
                                      <Grid
                                        container
                                        className={classes.iconAlign}
                                      >
                                        <Grid>
                                          <Typography
                                            color="textPrimary"
                                            className={classes.text}
                                          >
                                            {user.user_name}
                                          </Typography>
                                          <Typography
                                            color="textPrimary"
                                            className={classes.textDate}
                                          >
                                            {user.user_firstname}
                                          </Typography>
                                          <Typography
                                            color="textPrimary"
                                            className={classes.textDate}
                                          >
                                            {user.user_lastname}
                                          </Typography>
                                        </Grid>
                                        <Grid>
                                          {user.authorized_id == 2 ? (
                                            <StarIcon
                                              className={classes.iconStarSmall}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Link>
                                  ) : (
                                    <Grid
                                      container
                                      className={classes.iconAlign}
                                    >
                                      <Grid>
                                        <Typography
                                          color="textPrimary"
                                          className={classes.text}
                                        >
                                          {user.user_name}

                                          {user.authorized_id == 2 ? (
                                            <StarIcon
                                              className={classes.iconStarSmall}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </Typography>
                                        <Typography
                                          color="textPrimary"
                                          className={classes.textDate}
                                        >
                                          {user.user_firstname}
                                        </Typography>
                                        <Typography
                                          color="textPrimary"
                                          className={classes.textDate}
                                        >
                                          {user.user_lastname}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <ManageUserSwitchAuth
                                    userData={user}
                                    snackAlert={snackAlert}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <MenuUser
                                    userData={user}
                                    snackAlert={snackAlert}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {user.authorized_id === 2 ||
                                    (user.user_active && (
                                      <Link
                                        to={{
                                          pathname:
                                            "/manageusersecond/" + user.user_id,
                                          state: {
                                            user_id: user.user_id,
                                            user_firstname: user.user_firstname,
                                            user_active: user.user_active,
                                          },
                                        }}
                                      >
                                        <IconButton
                                          className={classes.iconButton}
                                        >
                                          <NavigateNextIcon></NavigateNextIcon>
                                        </IconButton>
                                      </Link>
                                    ))}
                                </TableCell>
                              </Hidden>
                            </TableRow>
                          ))
                        : console.log("Nodata")}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Registor updateUser={updateUser} snackAlert={snackAlert} />
            </Fragment>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      )}
    </div>
  );
};
export default ManageUserFirst;
