import React, { useEffect, Fragment, useState } from "react";
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
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import UploadBtn from "./UploadBtn";
import { getFiles } from "../../actions/fileActions";
import { Link, useHistory } from "react-router-dom";
import ConfirmDownload from "./ConfirmDowload";
import useStyles from "./StyleFiles";
import Circular from "../layout/Circular";
import GetAppIcon from "@material-ui/icons/GetApp";
import FileType from "./filetype/Filetypes";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

const ViewFiles = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { files, loading } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const [folderID, setFolderID] = useState();
  const [folderName, setFolderName] = useState();
  const [accessupload, setAccessUpload] = useState({});
  const [accessdownload, setAccessDowload] = useState({});
  useEffect(() => {
    if (props.location.state) {
      const {
        folder_id,
        folder_name,
        access_upload,
        access_download,
      } = props.location.state;
      setAccessUpload(access_upload);
      setAccessDowload(access_download);
      setFolderID(folder_id);
      setFolderName(folder_name);
      dispatch(getFiles(folder_id));
    } else if (!props.location.state) {
      history.push("/");
    }
  }, []);
  const updateList = () => {
    dispatch(getFiles(folderID));
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
              <Typography className={classes.text}>{folderName}</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Hidden smDown>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCellName}>
                    <Typography color="textPrimary" className={classes.text}>
                      ชื่อไฟล์
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" className={classes.text}>
                      วันที่อัพโหลด
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
                            <FileType
                              typefile={file.file_name}
                              src={file.src}
                            />
                            <div className={classes.nowrap}>
                              <Box
                                className={classes.nowrapText}
                                textOverflow="ellipsis"
                                overflow="hidden"
                              >
                                {file.file_name}
                              </Box>
                            </div>
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
                          {accessdownload ? (
                            <ConfirmDownload
                              filename={file.file_name}
                              fileid={file.file_id}
                            />
                          ) : (
                            <GetAppIcon color="disabled" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Hidden>
          <Hidden mdUp>
            <Table>
              <TableBody>
                {!loading && files !== null
                  ? files.map((file) => (
                      <TableRow key={file.file_id} hover>
                        <TableCell>
                          <Grid container className={classes.iconAlign}>
                            <Grid>
                              <FileType
                                typefile={file.file_name}
                                src={file.src}
                              />
                            </Grid>
                            <Grid>
                              <div className={classes.nowrap}>
                                <Box
                                  className={classes.nowrapText}
                                  textOverflow="ellipsis"
                                  overflow="hidden"
                                >
                                  {file.file_name}
                                </Box>
                              </div>
                              <Typography className={classes.textDate}>
                                {moment
                                  .utc(file.file_created)
                                  .add(3, "minutes")
                                  .format("DD-MM-YYYY HH:mm")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          {accessdownload ? (
                            <ConfirmDownload
                              filename={file.file_name}
                              fileid={file.file_id}
                            />
                          ) : (
                            <GetAppIcon color="disabled" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Hidden>
          {files === null ? (
            <Table>
              <TableRow>
                <TableCell className={classes.emptyTable}>
                  <Typography>{" โฟลเดอร์นี้ว่างเปล่า "}</Typography>
                </TableCell>
              </TableRow>
            </Table>
          ) : null}
          {loading && (
            <div className={classes.loading}>
              <Circular />
            </div>
          )}
        </Paper>
      </Grid>
      {accessupload && <UploadBtn refresh={updateList} folderId={folderID} />}
    </Fragment>
  );
};

export default ViewFiles;
