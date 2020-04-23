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
import AddFolder from './AddFolder'


const ViewFolderAdminStyle = makeStyles({
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
        color: "#FCD462",
        verticalAlign: 'middle'
    },
    breadcrumbs: {
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
    },
    menu: {
        width: 250,
    },
});

const ViewFolderAdmin = () => {
    const classes = ViewFolderAdminStyle();
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
            <Grid container direction="row" justify="center" alignItems="center">
                <Paper className={classes.paper}>
                    <Grid container direction="row" justify="left" alignItems="center">
                        <Breadcrumbs
                            className={classes.breadcrumbs}
                            separator={<NavigateNextIcon />}
                            aria-label="breadcrumb"
                        >
                            <Typography className={classes.text} color="textPrimary">โฟลเดอร์ทั้งหมด</Typography>
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
                                <TableCell align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        วันที่แก้ไข
                                     </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        ตัวเลือก
                                     </Typography>
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
                                            pathname: "/viewfilesadmin/"
                                            //         "/ViewFiles/" + row.folder_id + row.folder_name,
                                        }}
                                    >
                                        <Grid container spacing={1} direction="row" alignItems="center">
                                            <Grid item xs={1}>
                                                <FolderIcon className={classes.color} />
                                            </Grid>
                                            <Grid item></Grid>
                                            <Grid item xs={10}>
                                                <Typography color="textPrimary" className={classes.text} >
                                                    โฟลเดอร์ A
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Link>
                                    {/* </Link> */}
                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        15/4/2020
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={handleMoreVertIconClick}>
                                        <MoreVertIcon></MoreVertIcon>
                                    </IconButton>
                                    <Menu className={classes.menu}
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                                        onClose={handleMoreVertIconClose}
                                    >
                                        <MenuItem>
                                            <ListItemIcon >
                                                <RemoveIcon />
                                            </ListItemIcon>
                                            <Typography variant="inherit">ลบ</Typography>
                                        </MenuItem>
                                        <MenuItem >
                                            <ListItemIcon>
                                                <CreateIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">แก้ไข</Typography>
                                        </MenuItem>
                                        <MenuItem >
                                            <ListItemIcon>
                                                <GetAppIcon />
                                            </ListItemIcon>
                                            <Typography variant="inherit">ดาวน์โหลด</Typography>
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell >
                                    <Link
                                        //component={Link}
                                        to={{
                                            pathname: "/viewfilesadmin/"
                                            //         "/ViewFiles/" + row.folder_id + row.folder_name,
                                        }}
                                    >
                                        <Grid container spacing={1} direction="row" alignItems="center">
                                            <Grid item xs={1}>
                                                <FolderIcon className={classes.color} />
                                            </Grid>
                                            <Grid item></Grid>
                                            <Grid item xs={10}>
                                                <Typography color="textPrimary" className={classes.text} >
                                                    โฟลเดอร์ A
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Link>
                                    {/* </Link> */}
                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        15/4/2020
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={handleMoreVertIconClick}>
                                        <MoreVertIcon></MoreVertIcon>
                                    </IconButton>
                                    <Menu className={classes.menu}
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                                        onClose={handleMoreVertIconClose}
                                    >
                                        <MenuItem>
                                            <ListItemIcon >
                                                <RemoveIcon />
                                            </ListItemIcon>
                                            <Typography variant="inherit">ลบ</Typography>
                                        </MenuItem>
                                        <MenuItem >
                                            <ListItemIcon>
                                                <CreateIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="inherit">แก้ไข</Typography>
                                        </MenuItem>
                                        <MenuItem >
                                            <ListItemIcon>
                                                <GetAppIcon />
                                            </ListItemIcon>
                                            <Typography variant="inherit">ดาวน์โหลด</Typography>
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>


                            {/* ))
                            : console.log("Nodata")} */}
                        </TableBody>
                    </Table>
                </Paper>
                <AddFolder />
            </Grid>
        </Fragment>
    );
}
export default ViewFolderAdmin;
