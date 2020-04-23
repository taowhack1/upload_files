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


const useStyles = makeStyles({
  paper: {
    width: "90%",
    boxShadow: "0 0 0 0",
    color: "white",
  },
  table: {
    width: "100%",
  },
  text: {
    fontSize: 20
  },
  color: {
    fontSize: 40,
    color: "#1976D2",
    verticalAlign: 'middle'
  },
  breadcrumbs: {
    marginTop: 20,
    marginBottom: 10,
  },
  NavigateNextIcon: {
    fontSize: 30,
  },
  opacity: {
    fontSize: 20,
    opacity: 0.7,
  },

});

const handleRowClick = (e) => {
  console.log(e);
};
const ViewFiles = (props) => {

  const [checked, setChecked] = React.useState(false);

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
  };

  const { folder_id, folder_name } = useParams();
  console.log(folder_id);
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon className={classes.NavigateNextIcon} />}
              aria-label="breadcrumb"
            >
              <Link to={{ pathname: '/' }} >
                <Typography className={classes.opacity} color="textPrimary">โฟลเดอร์ทั้งหมด</Typography>
              </Link>
              <Typography className={classes.text} color="textPrimary">โฟลเดอร์ {folder_name}</Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell variant="head" style={{ width: '50%' }} align="center">
                  <Typography color="textPrimary" className={classes.text} >
                    ชื่อ
                  </Typography>
                </TableCell>
                <TableCell variant="head" align="center">
                  <Typography color="textPrimary" className={classes.text} >
                    วันที่แก้ไขล่าสุด
                  </Typography>
                </TableCell>
                <TableCell variant="head" align="center">
                  <Typography color="textPrimary" className={classes.text} >
                    ดาวน์โหลด
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && files !== null
                ? files.map((row) => (
                  <TableRow key={row.file_id}>
                    <TableCell>
                      <Grid container spacing={1} direction="row" alignItems="center">
                        <Grid item xs={1}>
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckBoxChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <InsertDriveFileIcon className={classes.color} />
                        </Grid>
                        <Grid item></Grid>
                        <Grid item xs={9}>
                          <Typography color="textPrimary" className={classes.text} >
                            {row.file_name}
                          </Typography>
                        </Grid>
                      </Grid>

                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textPrimary" className={classes.text} >
                        {moment(row.file_created).format("DD-MM-YYYY HH:MM")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ConfirmDownload filename={row.file_name} />
                    </TableCell>

                  </TableRow>
                ))
                : console.log("Nodata")}
            </TableBody>
          </Table>
        </Paper >
      </Grid >
      {checked == false
        ? < SpeedDialTooltipOpen />
        : <Download />
      }
    </Fragment >
  );
};

export default ViewFiles;
