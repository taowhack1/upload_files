import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Circular from '../layout/Circular';
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
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FolderIcon from '@material-ui/icons/Folder';
import {
  getFolders,
  deleteFolder,
  getAllFolder,
} from '../../actions/folderActions';
import AddFolder from './AddFolder';
import useStyles from './StyleFiles';
import MenuFolder from './MenuFolder';

const ManageUser = () => {
  const classes = useStyles();
  const { folders, loading } = useSelector((state) => state.folder);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFolder());
  }, []);

  if (loading) {
    return <Circular />;
  }
  const refresh = () => {
    dispatch(getAllFolder());
  };
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
              <Typography className={classes.text}>
                โฟลเดอร์ทั้งหมด (จัดการผู้ใช้งาน)
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellName}>
                  <Typography className={classes.text}>ชื่อ</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.text}>วันที่แก้ไข</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && folders !== null
                ? folders.map((row) => (
                  <TableRow key={row.folder_id}>
                    <TableCell>
                      <Link
                        //component={Link}
                        to={{
                          pathname: '/manageuserfirst/' + row.folder_id,
                        }}
                      >
                        <Grid container className={classes.iconAlign}>
                          <Grid item></Grid>
                          <Grid item xs={1}>
                            <FolderIcon className={classes.iconFolderTable} />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography className={classes.text}>
                              {row.folder_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
                      {/* </Link> */}
                    </TableCell>
                    <TableCell align='center'>
                      <Typography className={classes.text}>
                        {moment(row.folder_created).format(
                          'DD-MM-YYYY HH:MM'
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
                : console.log('Nodata')}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default ManageUser;
