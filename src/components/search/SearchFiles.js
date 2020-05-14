import React from 'react';
import { useSelector } from 'react-redux';
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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ConfirmDownload from '../files/ConfirmDowload';
import useStyles from '../files/StyleFiles';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchMain from './SearchMain';

const SearchFiles = () => {
  const classes = useStyles();
  const { loading, searchfiles } = useSelector((state) => state.search);

  return (
    <div>
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
              <Typography className={classes.text}>ค้นหา</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          {/* <SearchMain /> */}
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
                <TableCell align='center'>
                  <Typography color='textPrimary' className={classes.text}>
                    ดาวน์โหลด
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading !== true && searchfiles !== null
                ? searchfiles.map((file, index) => (
                    <TableRow key={index} hover>
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
                              {file.file_data.file_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.text}>
                          {file.file_data.folder_name}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.text}>
                          {moment
                            .utc(file.file_data.file_created)
                            .add(3, 'minutes')
                            .format('DD-MM-YYYY HH:mm')}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.text}>
                          {file.file_data.user_firstname}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        {file.access_download ? (
                          <ConfirmDownload
                            filename={file.file_data.file_name}
                            fileid={file.file_data.file_id}
                          />
                        ) : (
                          <GetAppIcon color='disabled' />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : console.log('folder empty')}
            </TableBody>
          </Table>
          {searchfiles === null ? (
            <Table>
              <TableRow>
                <TableCell className={classes.emptyTable}>
                  <Typography>{' ไม่มีข้อมูล '}</Typography>
                </TableCell>
              </TableRow>
            </Table>
          ) : (
            console.log('folder empty')
          )}
        </Paper>
      </Grid>
    </div>
  );
};

export default SearchFiles;
