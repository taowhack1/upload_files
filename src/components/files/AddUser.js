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
import TextField from '@material-ui/core/TextField';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './StyleFiles'

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
                    <div className={classes.modalPaper}>
                        <div className={classes.root}>
                            <Typography className={classes.text} color="textPrimary">สร้างรายชื่อ</Typography>
                            <div className={classes.modalIconAlign} >
                                <Grid container className={classes.iconAlign} >
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
                            <Typography className={classes.text}>สิทธิ์การใช้งาน</Typography>
                            <div className={classes.modalIconAlign}>
                                <Grid container className={classes.iconAlign} >
                                    <Grid item xs></Grid>
                                    <Grid item sm={1} > <Checkbox
                                        className={classes.iconCheck}
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    /></Grid>
                                    <Grid item xs={7} >
                                        <Typography className={classes.text}>ดาวน์โหลด</Typography>
                                    </Grid>
                                    <Grid item xs></Grid>
                                </Grid>
                                <Grid container className={classes.iconAlign} >
                                    <Grid item xs></Grid>
                                    <Grid item sm={1} > <Checkbox
                                        className={classes.iconCheck}
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    /></Grid>
                                    <Grid item xs={7} >
                                        <Typography className={classes.text}>อัพโหลด</Typography>
                                    </Grid>
                                    <Grid item xs></Grid>
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