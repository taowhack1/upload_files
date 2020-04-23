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

const ManageUserSecond = () => {
    const classes = useStyles();
    const { folders, loading } = useSelector((state) => state.folder);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = (event) => {
        setChecked(event.target.checked);
    };

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
                            separator={<NavigateNextIcon className={classes.NavigateNextIcon} />}
                            aria-label="breadcrumb"
                        >
                            <Link to={{ pathname: '/manageuser' }} >
                                <Typography className={classes.opacity} color="textPrimary">จัดการผู้ใช้งาน</Typography>
                            </Link>
                            <Link to={{ pathname: '/manageuserfirst' }} >
                                <Typography className={classes.opacity} color="textPrimary">โฟลเดอร์</Typography>
                            </Link>
                            <Typography className={classes.text} color="textPrimary">สิทธิ์การใช้งาน</Typography>
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
                                        ดาวน์โหลด
                                     </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography color="textPrimary" className={classes.text} >
                                        อัพโหลด
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
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheckBoxChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheckBoxChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={handleMoreVertIconClick}>
                                        <MoreVertIcon></MoreVertIcon>
                                    </IconButton>
                                    <Menu className={classes.menu}
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMoreVertIconClose}
                                    >
                                        <MenuItem >
                                            <ListItemIcon>
                                                <RemoveIcon />
                                            </ListItemIcon>
                                            <Typography variant="inherit">ลบ</Typography>
                                        </MenuItem>
                                        <MenuItem >
                                            <ListItemIcon>
                                                <CreateIcon />
                                            </ListItemIcon>
                                            <Typography variant="inherit">แก้ไขชื่อ</Typography>
                                        </MenuItem>

                                    </Menu>
                                </TableCell>
                            </TableRow>
                            {/* ))
                            : console.log("Nodata")} */}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Fragment>
    );
}
export default ManageUserSecond;
