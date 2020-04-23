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
import PersonIcon from '@material-ui/icons/Person';
import { yellow, blueGrey } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
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
        width: 600,
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
    text: {
        fontSize: 20,
        marginTop: 5
    },
    icon: {
        fontSize: 50,
    },
    iconPerson: {
        margin: theme.spacing(1, 0, 0, -2),
        color: '#FDC8A2',
        fontSize: 40
    },
    checkBox: {
        margin: theme.spacing(0, 0, 0, -2),
    },
    margin: {
        marginTop: 25
    },
    grid: {
        marginTop: -5,
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



export default function AddUser() {
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
            <Tooltip onClick={handleOpen} title="เพิ่มผู้ใช้งาน" aria-label="add">
                <Fab color="primary" className={classes.absolute}>
                    <AddIcon className={classes.icon} />
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
                            <Typography className={classes.text} color="textPrimary">สร้างรายชื่อ</Typography>
                            <div className={classes.margin}>
                                <Grid container className={classes.grid}>
                                    <Grid item xs> </Grid>
                                    <Grid item sm={1} >
                                        <PersonIcon className={classes.iconPerson} />
                                    </Grid>
                                    <Grid item> </Grid>
                                    <Grid item xs={7}>
                                        <TextField
                                            placeholder="ชื่อผู้ใช้งาน"
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
                        </div>
                        <div className={classes.root}>
                            <Typography className={classes.text} color="textPrimary">สิทธิ์การใช้งาน</Typography>
                            <div className={classes.margin}>
                                <Grid container className={classes.grid}>
                                    <Grid item xs> </Grid>
                                    <Grid item xs={1} >
                                        <Checkbox
                                            className={classes.checkBox}
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                    <Grid item> </Grid>
                                    <Grid item xs={7}>
                                        <Typography className={classes.text} color="textPrimary">ดาวน์โหลด</Typography>
                                    </Grid>
                                    <Grid item xs> </Grid>
                                </Grid>
                                <Grid container className={classes.grid}>
                                    <Grid item xs> </Grid>
                                    <Grid item sm={1} >
                                        <Checkbox
                                            className={classes.checkBox}
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>
                                    <Grid item> </Grid>
                                    <Grid item xs={7}>
                                        <Typography className={classes.text} color="textPrimary">อัพโหลด</Typography>
                                    </Grid>
                                    <Grid item xs> </Grid>
                                </Grid>
                            </div>
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