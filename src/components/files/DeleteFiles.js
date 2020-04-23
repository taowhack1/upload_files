import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./upload_style.css";
import "./style.css";
import { Modal, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { yellow } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { spacing } from '@material-ui/system';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 500,
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
    icon: {
        fontSize: 50,
    },
    text: {
        fontSize: 20,
        marginTop: 4
    },
    icon: {
        fontSize: 50,
    },
    iconCheck: {
        margin: theme.spacing(0, 0, 0, -2),
        color: yellow[500],
        fontSize: 40
    },
    margin: {
        marginTop: 20,
    },
    grid: {
        marginTop: -5,
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
    btnDel: {
        padding: theme.spacing(1, 4, 1),
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

export default function DeleteFiles() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip onClick={handleOpen} title="ลบ" aria-label="add">
                <Fab color="primary" className={classes.absolute}>
                    <RemoveIcon className={classes.icon} />
                </Fab>
            </Tooltip>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.root}>
                            <Typography className={classes.text} color="textPrimary">เอกสารที่เลือก</Typography>
                            <div className={classes.margin}>
                                <Grid container className={classes.grid} >
                                    <Grid item xs></Grid>
                                    <Grid item xs={1} > <Checkbox
                                        className={classes.iconCheck}
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    /></Grid>
                                    <Grid item xs={9} >
                                        <Typography className={classes.text} color="textPrimary">เอกสาร</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.grid} >
                                    <Grid item xs></Grid>
                                    <Grid item xs={1} > <Checkbox
                                        className={classes.iconCheck}
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    /></Grid>
                                    <Grid item xs={9} >
                                        <Typography className={classes.text} color="textPrimary">เอกสาร</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.controlBtnfolder}>
                            <Button variant="contained" className={classes.btnDel}>
                                <Typography className={classes.text} color="textPrimary" elevation={0}>
                                    Delete
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