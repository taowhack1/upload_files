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

} from "@material-ui/core/";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import RemoveIcon from '@material-ui/icons/Remove';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderIcon from "@material-ui/icons/Folder";
import { getFolders } from "../../actions/folderActions";
import useStyles from './StyleFiles'


// const useStyles = makeStyles({
//     paper: {
//         width: "90%",
//         boxShadow: "0 0 0 0",
//         color: "white",
//     },
//     table: {
//         width: "100%",
//     },
//     color: {
//         fontSize: 40,
//         color: "#FCD462",
//         verticalAlign: 'middle'
//     },
//     text: {
//         fontSize: 20
//     },
//     menu: {
//         width: 250
//     },
//     breadcrumbs: {
//         marginTop: 20,
//         marginBottom: 10
//     },
//     opacity: {
//         fontSize: 20,
//         opacity: 0.7,
//     },
//     NavigateNextIcon: {
//         fontSize: 30,
//     },
//     menu: {
//         width: 250
//     }
// });

const ManageUser = () => {
    const classes = useStyles();
    const { folders, loading } = useSelector((state) => state.folder);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMoreVertIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMoreVertIconClose = () => {
        setAnchorEl(null);
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
            <Grid container className={classes.gridContainer}>
                <Paper className={classes.paper}>
                    <Grid container >
                        <Breadcrumbs
                            className={classes.breadcrumbs}
                            separator={<NavigateNextIcon className={classes.NavigateNextIcon} />}
                            aria-label="breadcrumb"
                        >
                            <Typography className={classes.text}>จัดการผู้ใช้งาน</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCellName}>
                                    <Typography className={classes.text} >
                                        ชื่อ
                                     </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography className={classes.text} >
                                        วันที่แก้ไข
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
                                        //component={Link}
                                        to={{
                                            pathname: "/manageuserfirst"
                                            //         "/ViewFiles/" + row.folder_id + row.folder_name,
                                        }}
                                    >
                                        <Grid container className={classes.iconAlign}>
                                            <Grid item></Grid>
                                            <Grid item xs={1}>
                                                <FolderIcon className={classes.iconFolderTable} />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography className={classes.text} >
                                                    โฟลเดอร์ A
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                    {/* </Link> */}
                                </TableCell>
                                <TableCell align="center">
                                    <Typography className={classes.text} >
                                        15/4/2020
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.tableMargin}>

                                </TableCell>
                            </TableRow>
                            {/* ))
                            : console.log("Nodata")} */}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Fragment >
    );
}
export default ManageUser;
