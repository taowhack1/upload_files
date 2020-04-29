import React from 'react';
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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useStyles from './StyleFiles'

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
                    <div className={classes.modalPaper}>
                        <div className={classes.root}>
                            <Typography className={classes.text} color="textPrimary">สร้างรายชื่อ</Typography>
                            <div className={classes.modalIconAlign} >
                                <Grid container className={classes.iconAlign} >
                                    <Grid item xs> </Grid>
                                    <Grid item sm={1} >
                                        <FolderIcon className={classes.iconFolder} />
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

                        <div className={classes.modalBtn}>
                            <Button variant="contained" className={classes.modalbtnOk}>
                                <Typography className={classes.text} color="textPrimary" elevation={0}>
                                    OK
                                </Typography>
                            </Button>
                            <Button color="primary" className={classes.modalbtnCancel}>
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