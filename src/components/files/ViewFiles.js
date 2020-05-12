import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
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
              aria-label="breadcrumb"
            >
              <Link to={{ pathname: "/" }}>
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
                  <Typography color="textPrimary" className={classes.text}>
                    ชื่อ
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text}>
                    วันที่แก้ไขล่าสุด
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text}>
                    ดาวน์โหลด
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && files !== null
                ? files.map((file) => (
                  <TableRow key={file.file_id} hover>
                    <TableCell>
                      <Grid container className={classes.iconAlign}>
                        <Grid item xs={1}>
                          <InsertDriveFileIcon
                            className={classes.iconFilesTable}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            color="textPrimary"
                            className={classes.text}
                          >
                            {file.file_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.text}>
                        {moment
                          .utc(file.file_created)
                          .add(3, "minutes")
                          .format("DD-MM-YYYY HH:mm")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ConfirmDownload
                        filename={file.file_name}
                        fileid={file.file_id}
                      />
                    </TableCell>
                  </TableRow>
                ))
                : console.log("folder empty")}
            </TableBody>
          </Table>
          {files === null ? (
            <Table>
              <TableRow>
                <TableCell className={classes.emptyTable}>
                  <Typography>{" โฟลเดอร์นี้ว่างเปล่า "}</Typography>
                </TableCell>
              </TableRow>
            </Table>
          ) : (
              console.log("folder empty")
            )}
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
