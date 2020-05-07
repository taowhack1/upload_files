import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Circular from '../layout/Circular';
import { makeStyles } from '@material-ui/core/styles';
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
  Menu,
  MenuItem,
  IconButton,
  Checkbox,
  Switch,
} from '@material-ui/core/';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import RemoveIcon from '@material-ui/icons/Remove';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {
  updateAccessFolder,
  setLoading,
  getUserAll,
} from '../../actions/authActions';
import PersonIcon from '@material-ui/icons/Person';
import AddUser from './AddUser';
import useStyles from './StyleFiles';
import MenuUser from './MenuUser';

const ManageUserFirst = () => {
  const classes = useStyles();
  const { loading, users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [current, setCurrent] = useState({
    access_id: '',
    access_upload: '',
    access_download: '',
    access_active: '',
  });

  // const handleChangeSwitch = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  // useEffect(() => {
  //   dispatch(getUserByFolderId(folder_id));
  //   setState(userbyfolderid);
  // }, []);

  useEffect(() => {
    dispatch(getUserAll());
  }, []);

  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    dispatch(updateAccessFolder(current));
    dispatch(setLoading());
  };

  if (loading) {
    return <Circular />;
  }

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
              <Link to={{ pathname: '/manageuserfirst' }}>
                <Typography className={classes.opacity} color='textPrimary'>
                  จัดการผู้ใช้งาน
                </Typography>
              </Link>
              {/* <Typography className={classes.text} color='textPrimary'>
                โฟลเดอร์
              </Typography> */}
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
                          //component={Link}
                          to={{
                            pathname: '/manageusersecond/' + user.user_id,
                            //         "/ViewFiles/" + row.folder_id + row.folder_name
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
                        {/* <Switch
                          onChange={handleChangeSwitch}
                          checked={row.access_active}
                          className={classes.tableMargin}
                        ></Switch> */}
                      </TableCell>
                      <TableCell align='center'>
                        <Link to='/manageusersecond'>
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
      <AddUser />
    </Fragment>
  );
};
export default ManageUserFirst;
