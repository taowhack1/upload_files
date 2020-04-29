import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../actions/fileActions";
import { useParams, Link } from "react-router-dom";
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

} from "@material-ui/core/";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import RemoveIcon from '@material-ui/icons/Remove';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteFiles from './DeleteFiles'
import useStyles from './StyleFiles';
import MenuFolder from './MenuFolder';

const ViewFilesAdmin = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuselected, menusetSelected] = React.useState([]);

    const handleMoreVertIconClick = (event, id) => {
        console.log(event)
        setAnchorEl(event.currentTarget);


    };

    const handleMoreVertIconClose = () => {
        setAnchorEl(null);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = files.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const [selected, setSelected] = React.useState([]);

    const handleSelectClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const { folder_id, folder_name } = useParams();
    //console.log(folder_id);
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
                    <Grid container >
                        <Breadcrumbs
                            className={classes.breadcrumbs}
                            separator={<NavigateNextIcon className={classes.NavigateNextIcon} />}
                            aria-label="breadcrumb"
                        >
                            <Link to={{ pathname: '/viewfolderadmin' }} >
                                <Typography className={classes.opacity} >โฟลเดอร์ทั้งหมด</Typography>
                            </Link>
                            <Typography className={classes.text} >โฟลเดอร์</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ width: "1%" }}>
                                    <Checkbox
                                        className={classes.tableMargin}
                                        onClick={handleSelectAllClick}
                                    // checked={state.checkedA} 
                                    // name="checkedA"
                                    // onChange={handleCheckBoxChange}
                                    // inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell className={classes.tableCellName}>
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
                            {!loading && files !== null
                                ? files.map((row) => (
                                    <TableRow key={row.file_id} hover >

                                        <TableCell align="center">
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
                                        </TableCell>
                                        <TableCell >
                                            <Grid container className={classes.iconAlign}>
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
                                            <MenuFolder />
                                        </TableCell>
                                    </TableRow>
                                ))
                                : console.log("Nodata")}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <DeleteFiles listDelFiles={selected} />
        </Fragment >
    );
}
export default ViewFilesAdmin;
