import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    Menu,
    MenuItem,
    IconButton,
    Checkbox,
    Switch,

} from "@material-ui/core/";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import RemoveIcon from '@material-ui/icons/Remove';

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { getFolders } from "../../actions/folderActions";
import PersonIcon from '@material-ui/icons/Person';
import AddUser from "./AddUser";

const useStyles = makeStyles({
    paper: {
        width: "90%",
        boxShadow: "0 0 0 0",
        color: "white",
    },
    table: {
        width: "100%",
    },
    color: {
        fontSize: 40,
        color: "#FDC8A2",
        verticalAlign: 'middle'
    },
    text: {
        fontSize: 20
    },
    breadcrumbs: {
        marginTop: 20,
        marginBottom: 10
    },
    opacity: {
        fontSize: 20,
        opacity: 0.7,
    },
    NavigateNextIcon: {
        fontSize: 30,
    },
    menu: {
        width: 250
    }
});

const ManageUserFirst = () => {
    const classes = useStyles();
    const { folders, loading } = useSelector((state) => state.folder);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFolders(localStorage.getItem("user_id")));
    }, []);

    const handleRowClick = (folder_id) => {
        console.log(folder_id);
    };

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
                            <Link to={{ pathname: '/manageuser' }} >
                                <Typography className={classes.opacity} color="textPrimary">จัดการผู้ใช้งาน</Typography>
                            </Link>
                            <Typography className={classes.text} color="textPrimary">โฟลเดอร์</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '50%' }} align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        ชื่อ
                                     </Typography>
                                </TableCell>
                                <TableCell style={{ width: '30%' }} align="center">

                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        สิทธิ์การใช้งาน
                                     </Typography>
                                </TableCell>
                                <TableCell align="center">

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {!loading && folders !== null
                            ? folders.map((row) => ( */}
                            <TableRow >
                                <TableCell >
                                    <Link
                                        component={Link}
                                    // to={{
                                    //     pathname:
                                    //         "/ViewFiles/" + row.folder_id + row.folder_name,
                                    // }}
                                    >
                                        <Grid container spacing={1} direction="row" alignItems="center">
                                            <Grid item xs={1}>
                                                <PersonIcon className={classes.color} />
                                            </Grid>
                                            <Grid item></Grid>
                                            <Grid item xs={9}>
                                                <Typography color="textPrimary" className={classes.text} >
                                                    นาง A
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Link>
                                    {/* </Link> */}
                                </TableCell>
                                <TableCell align="center">

                                </TableCell>
                                <TableCell align="center">
                                    <Switch ></Switch>
                                </TableCell>
                                <TableCell align="center">
                                    <Link to='/manageusersecond'>
                                        <NavigateNextIcon fontSize="large"></NavigateNextIcon>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            {/* ))
                            : console.log("Nodata")} */}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <AddUser />
        </Fragment>
    );
}
export default ManageUserFirst;
