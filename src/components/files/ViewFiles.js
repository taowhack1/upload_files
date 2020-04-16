import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
} from '@material-ui/core/';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SpeedDialTooltipOpen from './speedDial';
import FolderIcon from '@material-ui/icons/Folder';
import { getFiles } from '../../actions/fileActions';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  paper: {
    width: '90%',
    boxShadow: '0 0 0 0',
    color: 'white',
  },
  table: {
    width: '100%',
  },
  color: {
    color: '#FCD462',
  },
});

const handleRowClick = (e) => {
  console.log(e);
};

const ViewFiles = () => {
  const { folder_id } = useParams();
  console.log(folder_id);
  const classes = useStyles();
  const { files, loading } = useSelector((state) => state.file);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles(folder_id));
  }, []);

  if (loading) {
    console.log('loading >>> ' + loading);
  }

  return (
    <Fragment>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        <Typography color='textPrimary' variant='h6'>
          โฟล์เดอร์ของฉัน > โฟลเดอร์ A
        </Typography>
      </Breadcrumbs>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ชื่อ</TableCell>
                <TableCell align='left'>วันที่แก้ไขล่าสุด</TableCell>
                <TableCell align='left'>ดาวน์โหลด</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && files !== null
                ? files.map((row) => (
                    <TableRow key={row.file_id}>
                      <TableCell>
                        <Button onClick={() => handleRowClick()}>
                          <FolderIcon className={classes.color} />
                          &nbsp;&nbsp;{row.file_name}
                        </Button>
                      </TableCell>
                      <TableCell align='left'>
                        {moment(row.file_created).format()}
                      </TableCell>
                    </TableRow>
                  ))
                : console.log('Nodata')}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <SpeedDialTooltipOpen />
    </Fragment>
  );
};

export default ViewFiles;
