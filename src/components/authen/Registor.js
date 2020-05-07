import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { Container } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '../files/StyleFiles'

export default function Registor() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        user_name: '',
        user_password: '',
        user_firstname: '',
        user_lastname: '',
        authorized_id: '',
    });


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
                            <Typography className={classes.text}>เปลี่ยนรหัสผ่าน</Typography>
                            <Container maxWidth='xl' >
                                <form style={{ marginTop: 10, marginRight: 30, marginLeft: 30 }} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="firstName"
                                                variant="outlined"
                                                placeholder="ชื่อ"
                                                required
                                                fullWidth
                                                id="firstName"
                                                autoFocus
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="lastName"
                                                placeholder="นามสกุล"
                                                name="lastName"
                                                autoComplete="lname"
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="firstName"
                                                variant="outlined"
                                                placeholder="ชื่อ"
                                                required
                                                fullWidth
                                                id="firstName"
                                                autoFocus
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='user_password_old'
                                        placeholder="Username"
                                        name='user_password_old'
                                        //type={values.showPassword ? 'text' : 'password'}
                                        //onChange={(e) => onChange(e)}
                                        //error={errorCheck.errorChecks_password_old}
                                        //helperText={error.error_password_old}
                                        className={classes.textField}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='user_password_old'
                                        placeholder="Password"
                                        name='user_password_old'
                                        type='password'
                                        //type={values.showPassword ? 'text' : 'password'}
                                        //onChange={(e) => onChange(e)}
                                        //error={errorCheck.errorChecks_password_old}
                                        //helperText={error.error_password_old}
                                        className={classes.textField}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                    />

                                    <div className={classes.modalBtn} style={{ marginTop: 5 }}>
                                        <Button variant="contained" className={classes.modalbtnSave} >
                                            <Typography className={classes.text} color="textPrimary" elevation={0}>
                                                Save
                                            </Typography>
                                        </Button>
                                        <Button color="primary" className={classes.modalbtnCancel} onClick={handleClose}>
                                            <Typography className={classes.text} color="textPrimary">
                                                Cancel
                                            </Typography>
                                        </Button>
                                    </div>
                                </form>

                            </Container>
                        </div>
                    </div>
                </Fade>

            </Modal >
        </div >
    );
}