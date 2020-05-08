import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Circular from '../layout/Circular';
import { getUserAll } from '../../actions/authActions';
import Registor from '../authen/Registor';
import useStyles from './StyleFiles';
import MenuUser from './MenuUser';
import jwt from 'jsonwebtoken';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PersonIcon from '@material-ui/icons/Person';
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
} from '@material-ui/core/';
import { useSnackbar } from 'notistack';

const ManageUserFirst = () => {
  const classes = useStyles();
  const { loading, users } = useSelector((state) => state.auth);
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
    <Fragment>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Paper className={classes.paper}>
          <Grid container direction='row' justify='left' alignItems='center'>
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={
                <NavigateNextIcon className={classes.NavigateNextIcon} />
              }
              aria-label='breadcrumb'
            >
              <Typography className={classes.text} color='textPrimary'>
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
                  <Typography color='textPrimary' className={classes.text}>
                    ชื่อ
                  </Typography>
                </TableCell>
                <TableCell style={{ width: '20%' }} align='center'></TableCell>
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    สิทธิ์การใช้งาน
                  </Typography>
                </TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users !== null
                ? users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link
                          to={{
                            pathname:
                              '/manageusersecond/' +
                              jwt.sign({ user_id: user.user_id }, '1234'),
                          }}
                        >
                          <Grid container className={classes.iconAlign}>
                            <Grid item></Grid>
                            <Grid item xs={1}>
                              <PersonIcon className={classes.iconPersonTable} />
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                color='textPrimary'
                                className={classes.text}
                              >
                                {user.user_firstname}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                      </TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'>
                        <MenuUser userData={user} />
                      </TableCell>
                      <TableCell align='center'>
                        <Link
                          to={{
                            pathname:
                              '/manageusersecond/' +
                              jwt.sign(
                                {
                                  user_id: user.user_id,
                                  user_firstname: user.user_firstname,
                                },
                                '1234'
                              ),
                          }}
                        >
                          <IconButton className={classes.tableMargin}>
                            <NavigateNextIcon></NavigateNextIcon>
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                : console.log('Nodata')}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Registor updateUser={updateUser} />
    </Fragment>
  );
};
export default ManageUserFirst;
