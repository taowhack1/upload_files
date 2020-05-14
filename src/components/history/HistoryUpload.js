import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from '../../actions/logActions';
import moment from 'moment';
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
  Checkbox,
  Divider,
} from '@material-ui/core/';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import useStyles from '../files/StyleFiles';
import CircularProgress from '@material-ui/core/CircularProgress';
const HistoryUpload = (props) => {
  const classes = useStyles();
  const { logs, loading } = useSelector((state) => state.log);
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated, authdata } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLogs());
    if (authenticated) {
      if (authdata.authorized_id == 1) {
        history.push('/');
      }
    }
  }, []);

  return (
    <Fragment>
      <Grid container className={classes.gridContainer}>
        <Paper className={classes.paper}>
          <Grid container>
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={
                <NavigateNextIcon className={classes.NavigateNextIcon} />
              }
              aria-label='breadcrumb'
            >
              <Typography className={classes.text} color='textPrimary'>
                ประวัติการอัพโหลด
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
                    ชื่อไฟล์
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    ชื่อโฟลเดอร์
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    วันที่อัพโหลด
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    ผู้อัพโหลด
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && logs !== null
                ? logs.map((log) => (
                    <TableRow key={log.file_id} hover>
                      <TableCell>
                        <Grid container className={classes.iconAlign}>
                          <Grid item xs={1}>
                            <InsertDriveFileIcon
                              className={classes.iconFilesTable}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <Typography
                              color='textPrimary'
                              className={classes.text}
                            >
                              {log.file_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.text}>
                          {log.folder_name}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.text}>
                          {moment
                            .utc(log.file_created)
                            .add(3, 'minutes')
                            .format('DD-MM-YYYY HH:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.text}>
                          {log.user_firstname} {log.user_lastname}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                : console.log('folder empty')}
            </TableBody>
          </Table>
          {logs === null ? (
            <Table>
              <TableRow>
                <TableCell className={classes.emptyTable}>
                  <Typography>{' โฟลเดอร์นี้ว่างเปล่า '}</Typography>
                </TableCell>
              </TableRow>
            </Table>
          ) : (
            console.log('folder empty')
          )}
          {loading && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )}
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default HistoryUpload;