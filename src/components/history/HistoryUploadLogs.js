import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../../actions/logActions";
import moment from "moment";
import {
  Table,
  TableCell,
  TableRow,
  Paper,
  Grid,
  Breadcrumbs,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useStyles from "../files/StyleFiles";
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
        history.push("/");
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
              aria-label="breadcrumb"
            >
              <Typography className={classes.text} color="textPrimary">
                ประวัติการอัพโหลด
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Paper>
        <Paper>
          <List className={classes.root}>
            {!loading && logs !== null
              ? logs.map((log, index) => (
                  <div>
                    <ListItem key={log.file_id}>
                      <ListItemText
                        primary={log.file_name}
                        secondary={`ID #${
                          log.file_id
                        } last uploaded ${moment
                          .utc(log.file_created)
                          .add(3, "minutes")
                          .format("DD-MM-YYYY HH:mm")} by ${
                          log.user_firstname
                        } ${log.user_lastname}  `}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              : console.log("Nodata")}
          </List>
          {logs === null ? (
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
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default HistoryUpload;
