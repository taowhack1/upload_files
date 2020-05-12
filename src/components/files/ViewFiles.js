import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@material-ui/core/';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import UploadBtn from './UploadBtn';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { getFiles } from '../../actions/fileActions';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ConfirmDownload from './ConfirmDowload';
import useStyles from './StyleFiles';
import Circular from '../layout/Circular'

const ViewFiles = (props) => {
  //const { folder_id, folder_name } = props.location.state;
  const { authenticated, authdata } = useSelector((state) => state.auth);
  const history = useHistory();
  const classes = useStyles();
  const { files, loading } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const { folder_id, folder_name } = ''
  useEffect(() => {
    if (props.location.state) {
      const { folder_id, folder_name } = props.location.state;
      dispatch(getFiles(folder_id));
    } else if (!props.location.state) {
      history.push('/')
    }
  }, []);
  //console.log(authdata)
  if (loading) {
    console.log('loading >>> ' + loading);
  }
  const updateList = () => {
    dispatch(getFiles(folder_id));
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
              <Link to={{ pathname: '/' }}>
                <Typography className={classes.opacity}>
                  โฟลเดอร์ทั้งหมด
                </Typography>
              </Link>
              <Typography className={classes.text}>
                โฟลเดอร์ {folder_name}
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
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    วันที่แก้ไขล่าสุด
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    ดาวน์โหลด
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && files !== null
                ? files.map((row) => (
                  <TableRow key={row.file_id} hover>
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
                            {row.file_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography className={classes.text}>
                        {moment(row.file_created).format('DD-MM-YYYY HH:MM')}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <ConfirmDownload
                        filename={row.file_name}
                        fileid={row.file_id}
                      />
                    </TableCell>
                  </TableRow>
                ))
                : console.log('Nodata')}
            </TableBody>
          </Table>
          {loading && (
            <div className={classes.loading}>
              <Circular />
            </div>
          )}
        </Paper>
      </Grid>
      <UploadBtn refresh={updateList} folderId={folder_id} />
    </Fragment>
  );
};

export default ViewFiles;
