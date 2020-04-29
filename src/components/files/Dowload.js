import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./upload_style.css";
import "./style.css";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import { yellow } from '@material-ui/core/colors';
import { TextField, Checkbox, Typography } from '@material-ui/core';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import GetAppIcon from '@material-ui/icons/GetApp';
import useStyles from './StyleFiles'


export default function Dowload(props) {
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

        < div >
            <Tooltip onClick={handleOpen} title="เพิ่มโฟลเดอร์" aria-label="add">
                <Fab color="primary" className={classes.absolute}>
                    <GetAppIcon className={classes.icon} />
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
                    <div className={classes.modalPaper}>
                        <div className={classes.root}>
                            <Typography className={classes.text}>เอกสารที่เลือก</Typography>
                            <div className={classes.modalIconAlign}>

                                {props.listDownloads && props.listDownloads.map((listDownload) => (
                                    < div key={listDownload}>

                                        {props.listDownloads.length < 5
                                            ? <Grid container className={classes.iconAlign} >
                                                <Grid item xs></Grid>
                                                <Grid item xs={1} > <Checkbox
                                                    className={classes.iconCheck}
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                /></Grid>
                                                <Grid item xs={10} >
                                                    <Typography className={classes.text}>{listDownload}</Typography>
                                                </Grid>
                                            </Grid>
                                            : <Grid container className={classes.iconAlign} >

                                                ? < Grid item xs></Grid>
                                                <Grid item xs={1} > <Checkbox
                                                    className={classes.iconCheck}
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                /></Grid>
                                                <Grid item xs={5} >
                                                    <Typography className={classes.text}>{listDownload}</Typography>
                                                </Grid>
                                                    : <Grid item xs></Grid>
                                                <Grid item xs={1} > <Checkbox
                                                    className={classes.iconCheck}
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                /></Grid>
                                                <Grid item xs={5} >
                                                    <Typography className={classes.text}>{listDownload}</Typography>
                                                </Grid>

                                            </Grid>

                                        }
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        <div className={classes.modalBtn}>
                            <Button variant="contained" className={classes.modalbtnDownload}>
                                <Typography className={classes.text}>
                                    Download
                                </Typography>
                            </Button>
                            <Button onClick={handleClose} color="primary" className={classes.modalbtnCancel}>
                                <Typography className={classes.text} >
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