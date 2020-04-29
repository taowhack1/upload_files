import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
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
  Checkbox,
  IconButton,
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SpeedDialTooltipOpen from "./speedDial";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { getFiles } from "../../actions/fileActions";
import { useParams, Link } from "react-router-dom";
import ConfirmDownload from './ConfirmDowload';
import Download from './Dowload';
import useStyles from './StyleFiles'
import CircularProgress from '@material-ui/core/CircularProgress';


const handleRowClick = (e) => {
  console.log(e);
};
const ViewFiles = (props) => {

  // const [selected, setSelected] = React.useState([]);
  // const handleSelectClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };


  const { folder_id, folder_name } = useParams();
  //console.log(folder_id);
  const classes = useStyles();
  const { files, loading } = useSelector((state) => state.file);
  // const { files } = useSelector((state) => state.file.files);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles(folder_id));
  }, []);

  if (loading) {
    console.log("loading >>> " + loading);
  }

  return (

    <Fragment>
      <Grid container className={classes.gridContainer}>
        <Paper className={classes.paper}>
          <Grid container>
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon className={classes.NavigateNextIcon} />}
              aria-label="breadcrumb"
            >
              <Link to={{ pathname: '/' }} >
                <Typography className={classes.opacity} >โฟลเดอร์ทั้งหมด</Typography>
              </Link>
              <Typography className={classes.text} >โฟลเดอร์ {folder_name}</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* <TableCell align="center" style={{ width: "1%" }}>
                  <Checkbox
                    className={classes.tableMargin}

                  // checked={state.checkedA} 
                  // name="checkedA"
                  // onChange={handleCheckBoxChange}
                  // inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell> */}
                <TableCell className={classes.tableCellName}>
                  <Typography color="textPrimary" className={classes.text} >
                    ชื่อ
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text} >
                    วันที่แก้ไขล่าสุด
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textPrimary" className={classes.text} >
                    ดาวน์โหลด
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && files !== null
                ? files.map((row) => (
                  <TableRow key={row.file_id} hover>
                    {/* <TableCell align="center">
                      <Checkbox
                        className={classes.tableMargin}
                        // checked={isItemSelected(row.file_id)}
                        // onChange={() => handleSelect(row.file_id)}
                        onClick={(event) => handleSelectClick(event, row.file_name)}
                      // checked={state.checkedA}
                      // name="checkedA"
                      // onChange={handleCheckBoxChange}
                      // inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell> */}
                    <TableCell >
                      <Grid container className={classes.iconAlign} >
                        <Grid item xs={1}>
                          <InsertDriveFileIcon className={classes.iconFilesTable} />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography color="textPrimary" className={classes.text} >
                            {row.file_name}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* </Link> */}
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.text} >
                        {moment(row.file_created).format("DD-MM-YYYY HH:MM")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ConfirmDownload filename={row.file_name} fileid={row.file_id} />
                    </TableCell>
                  </TableRow>
                ))
                : console.log("Nodata")}
            </TableBody>
          </Table>
          {loading &&
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          }
        </Paper >
      </Grid >
      < SpeedDialTooltipOpen />
      {/* {selected == false
        ? < SpeedDialTooltipOpen />
        : <Download listDownloads={selected} />
      } */}
    </Fragment >
  );
};

export default ViewFiles;
