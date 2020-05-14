import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../actions/fileActions";
import { useParams, Link, useHistory } from "react-router-dom";
import moment from "moment";
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
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ConfirmDeleteFiles from "./ConfirmDeleteFiles";
import useStyles from "./StyleFiles";
import MenuFile from "./MenuFile";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";
import { deleteFile } from "../../actions/fileActions";
import FileType from './filetype/Filetypes'
import Hidden from '@material-ui/core/Hidden';
import Box from "@material-ui/core/Box";

const ViewFilesAdmin = (props) => {
  const classes = useStyles();
  const { files, loading } = useSelector((state) => state.file);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory()
  const { authenticated, authdata } = useSelector((state) => state.auth);

  const { folder_id, folder_name } = ''
  const [folderID, setFolderID] = React.useState()
  const [folderName, setFolderName] = React.useState()

  useEffect(() => {
    if (props.location.state) {
      const { folder_id, folder_name } = props.location.state;
      setFolderID(folder_id)
      setFolderName(folder_name)
      dispatch(getFiles(folder_id));
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

  const [selected, setSelected] = React.useState([]);
  const [index, setIndex] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const snackAlert = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };
  const handleSelectClick = (event, id, name) => {
    const selectedIndex = index.indexOf(id);
    console.log(selectedIndex);
    let newSelected = [];
    let selectIndex = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, {
        file_name: name,
        file_id: id,
        check_status: event.target.checked,
      });
      selectIndex = selectIndex.concat(index, id);
    } else if (selectedIndex === 0) {
      selectIndex = selectIndex.concat(index.slice(1));
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      selectIndex = selectIndex.concat(index.slice(0, -1));
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      selectIndex = selectIndex.concat(
        index.slice(0, selectedIndex),
        index.slice(selectedIndex + 1)
      );
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setIndex(selectIndex);
    setSelected(newSelected);
  };

  const updateList = () => {
    dispatch(getFiles(folderID));
    setSelected([]);
  };

  const handleDelete = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await dispatch(deleteFile(file.file_id, snackAlert));
    }
    updateList();
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
              <Link to={{ pathname: "/viewfolderadmin" }}>
                <Typography className={classes.opacity}>
                  โฟลเดอร์ทั้งหมด
                </Typography>
              </Link>
              <Typography className={classes.text}>{folderName}</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Hidden smDown >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "1%" }}></TableCell>
                  <TableCell className={classes.tableCellName}>
                    <Typography color="textPrimary" className={classes.text}>
                      ชื่อ
                  </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" className={classes.text}>
                      วันที่แก้ไข
                  </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" className={classes.text}>
                      ตัวเลือก
                  </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading && files !== null
                  ? files.map((file, index) => {
                    return (
                      <TableRow key={file.file_id} hover>
                        <TableCell align="center">
                          <Checkbox
                            className={classes.tableMargin}
                            onClick={(event) =>
                              handleSelectClick(
                                event,
                                file.file_id,
                                file.file_name
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Grid container className={classes.iconAlign}>
                            <Grid>
                              <FileType typefile={file.file_name} />
                            </Grid>
                            <Grid>
                              <Typography
                                color="textPrimary"
                                className={classes.text}
                              >
                                {file.file_name}
                              </Typography>
                            </Grid>
                          </Grid>
                          {/* </Link> */}
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
                          <MenuFile file={file} handleDelete={handleDelete} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                  : console.log("Nodata")}
              </TableBody>
            </Table>
          </Hidden>
          <Hidden mdUp>
            <Table >
              <TableBody>
                {!loading && files !== null
                  ? files.map((file) => (
                    <TableRow key={file.file_id} hover>
                      <TableCell align="center" className={classes.iconCheckBox}>
                        <Checkbox
                          onClick={(event) =>
                            handleSelectClick(
                              event,
                              file.file_id,
                              file.file_name
                            )
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <Grid container className={classes.iconAlign}>
                          <Grid>
                            <FileType typefile={file.file_name} />
                          </Grid>
                          <Grid >
                            <div className={classes.nowrapMany}>
                              <Box className={classes.nowrapTextMany} textOverflow="ellipsis"
                                overflow="hidden">
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
                      <TableCell align="center">
                        <MenuFile file={file} handleDelete={handleDelete} />
                      </TableCell>
                    </TableRow>
                  ))
                  : console.log("folder empty")}
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
          ) : (
              console.log("folder empty")
            )}
          {loading && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )}
          {selected.length != 0 && (
            <ConfirmDeleteFiles
              handleDelete={handleDelete}
              snackAlert={snackAlert}
              listDelFiles={selected}
              refresh={updateList}
            />
          )}
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default ViewFilesAdmin;
