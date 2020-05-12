import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
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
} from '@material-ui/core/';

import FolderIcon from '@material-ui/icons/Folder';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getFolders } from '../../actions/folderActions';
import PersonIcon from '@material-ui/icons/Person';
import useStyles from './StyleFiles';
import Circular from '../layout/Circular';
import MenuUserCheckUpload from './MenuUserCheckUpload';
import MenuUserSecondSwitch from './MenuUserSecondSwitch';

import { useSnackbar } from 'notistack';

const ManageUserSecond = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { authenticated, authdata } = useSelector((state) => state.auth);
  const { folders, loading } = useSelector((state) => state.folder);
  const history = useHistory()

  const dispatch = useDispatch();
  const { user_id, user_firstname, user_active } = ''
  useEffect(() => {
    if (props.location.state) {
      const { user_id, user_firstname, user_active } = props.location.state;
      dispatch(getFolders(user_id));
    } else if (!props.location.state) {
      if (authenticated) {
        if (authdata.authorized_id == 1) {
          history.push('/')
        }
        if (authdata.authorized_id == 2) {
          history.push('/manageuserfirst/')
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
      {props.location.state != null
        ?
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
                  <Typography className={classes.text} color='textPrimary'>
                    ตั้งค่าการใช้งาน
                  </Typography>
                </Breadcrumbs>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.tableCellName}
                      style={{ borderBottom: '0px' }}
                    ></TableCell>
                    <TableCell
                      align='center'
                      style={{ width: '27%', borderBottom: '0px' }}
                    ></TableCell>
                    <TableCell align='center' style={{ borderBottom: '0px' }}>
                      <Typography color='textPrimary' className={classes.text}>
                        สิทธิ์การใช้งาน
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell border={0} style={{ borderBottom: '0px' }}>
                      <Grid container className={classes.iconAlign}>
                        <Grid item></Grid>
                        <Grid item xs={1}>
                          {user_active ? (
                            <PersonIcon
                              className={classes.iconPersonTable}
                            />
                          ) : (
                              <PersonIcon
                                className={classes.iconPersonTableUnActive}
                              />
                            )}
                        </Grid>
                        <Grid item xs={10}>
                          <Typography color='textPrimary' className={classes.text}>
                            {user_firstname}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ borderBottom: '0px' }}
                    ></TableCell>
                    <TableCell align='center' style={{ borderBottom: '0px' }}>
                      <MenuUserSecondSwitch
                        userId={user_id}
                        userActive={user_active}
                        snackAlert={snackAlert}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                    <TableCell align='center'>
                      <Typography color='textPrimary' className={classes.text}>
                        ดาวน์โหลด
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography color='textPrimary' className={classes.text}>
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
                                color='textPrimary'
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
                    : console.log('Nodata')}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Fragment>
        : <Redirect to='/manageuserfirst' />
      }
    </div>

  );
};
export default ManageUserSecond;
