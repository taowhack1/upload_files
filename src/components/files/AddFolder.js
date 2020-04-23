import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./upload_style.css";
import "./style.css";
import { Modal, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import { yellow, grey } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        padding: theme.spacing(5, 5, 4),
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'fixed',
        bottom: theme.spacing(8),
        right: theme.spacing(8),
        height: 100,
        width: 100,
        backgroundColor: "#1976D2",
    },
    text: {
        fontSize: 20
    },
    icon: {
        fontSize: 50,
    },
    iconFolder: {
        margin: theme.spacing(1, 0, 0, -2),
        color: yellow[500],
        fontSize: 40
    },
    grid: {
        marginTop: 25,
    },
    textField: {
        width: '100%',
        backgroundColor: grey[300],
        outline: 'none',

    },
    controlBtnfolder: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    btnOk: {
        padding: theme.spacing(1, 7, 1),
    },
    btnCancel: {
        padding: theme.spacing(1, 4, 1),
    },
    input: {
        '&::placeholder': {
            fontSize: 20,
        },
    },


}));

export default function AddFolder() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleAddFolderOpen = () => {
        setOpen(true);
    };

    const handleAddFolderClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip onClick={handleAddFolderOpen} title="เพิ่มโฟลเดอร์" aria-label="add">
                <Fab color="primary" className={classes.absolute}>
                    <AddIcon className={classes.icon} />
                </Fab>
            </Tooltip>
            <Modal
                className={classes.modal}
                disableAutoFocus={true}
                outline='none'
                open={open}
                onClose={handleAddFolderClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.root}>
                            <Typography className={classes.text} color="textPrimary">สร้างโฟลเดอร์</Typography>
                            <Grid container className={classes.grid} >
                                <Grid item xs> </Grid>
                                <Grid item sm={1} >
                                    <FolderIcon className={classes.iconFolder} />
                                </Grid>
                                <Grid item> </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        placeholder="ชื่อโฟลเดอร์"
                                        type="search"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputProps={{
                                            classes: { input: classes.input }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs> </Grid>
                            </Grid>
                        </div>

                        <div className={classes.controlBtnfolder}>
                            <Button variant="contained" className={classes.btnOk}>
                                <Typography className={classes.text} color="textPrimary" elevation={0}>
                                    OK
                                </Typography>
                            </Button>
                            <Button color="primary" className={classes.btnCancel}>
                                <Typography className={classes.text} color="textPrimary">
                                    Cancel
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal >
        </div >
    );
}