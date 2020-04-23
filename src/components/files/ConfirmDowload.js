import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./upload_style.css";
import "./style.css";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from "@material-ui/icons/GetApp";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, Typography, IconButton } from '@material-ui/core';


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
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: 4,
        outline: 'none',
        padding: theme.spacing(5, 5, 4),
    },
    absolute: {

        backgroundColor: "#1976D2",
    },
    text: {
        fontSize: 20,
        marginTop: 4
    },
    controlBtnfolder: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    btnConfirm: {
        padding: theme.spacing(0, 2, 1, 2),
    },
    btnCancel: {
        padding: theme.spacing(0, 4.5, 1, 4.5),
    },
}));

export default function ConfirmDownload(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton>
                <GetAppIcon onClick={handleOpen} />
            </IconButton>
            <Modal
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
                            <Typography className={classes.text} color="textPrimary">คุณต้องการดาวน์โหลด {props.filename} ?</Typography>
                            <div className={classes.controlBtnfolder}>
                                <Button variant="contained" className={classes.btnConfirm}  >
                                    <Typography className={classes.text} color="textPrimary">
                                        Download
                                </Typography>
                                </Button>
                                <Button color="primary" className={classes.btnCancel}>
                                    <Typography className={classes.text} color="textPrimary">
                                        Cancel
                                </Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal >
        </div >
    );
}