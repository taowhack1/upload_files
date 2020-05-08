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
import useStyles from '../files/StyleFiles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

export default function Registor(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value1, setValue1] = useState(true);
    const [value2, setValue2] = useState(false);
    const [values, setValues] = useState({
        showPassword: false,
    });

    const [user, setUser] = useState({
        user_name: '',
        user_password: '',
        user_firstname: '',
        user_lastname: '',
        authorized_id: 1,
    });
    const [errorCheck, setErrorCheck] = useState({});
    const [error, setError] = useState({})

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        let users = {
            user_name: '',
            user_password: '',
            user_firstname: '',
            user_lastname: '',
            authorized_id: 1,
        }
        setUser({ ...user, ...users })
        setError({})
        setErrorCheck({})
        setValue1(true)
        setValue2(false)
    };
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };
    //const int = parseInt(user.authorized_id)

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeRadio = (e) => {
        if (e.target.value == "1") {
            setValue1(true)
            setValue2(false)
            console.log(e.target.value)
            setUser({ ...user, authorized_id: parseInt(e.target.value) })
        }
        if (e.target.value == "2") {
            setValue1(false)
            setValue2(true)
            console.log(e.target.value)
            setUser({ ...user, authorized_id: parseInt(e.target.value) })
        }
    };

    const validation = (e) => {
        let formIsValid = true;
        let errors = {
            error_firstname: '',
            error_lastname: '',
            error_username: '',
            error_password: '',
        }
        let errorChecks = {
            errorChecks_firstname: '',
            errorChecks_lastname: '',
            errorChecks_username: '',
            errorChecks_password: '',
        }

        if (user.user_firstname.length == 0) {
            formIsValid = false
            errorChecks.errorChecks_firstname = true
            errors.error_firstname = "กรุณากรอกชื่อ"
        }
        if (user.user_lastname.length == 0) {
            formIsValid = false
            errorChecks.errorChecks_lastname = true
            errors.error_lastname = "กรุณากรอกนามสกุล"
        }
        if (user.user_name.length == 0) {
            formIsValid = false
            errorChecks.errorChecks_username = true
            errors.error_username = "กรุณากรอก Username"
        }
        if (user.user_password.length == 0) {
            formIsValid = false
            errorChecks.errorChecks_password = true
            errors.error_password = "กรุณากรอก Password"
        }

        setErrorCheck({ ...errorCheck, ...errorChecks })
        setError({ ...error, ...errors })
        return formIsValid
    }
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validation()
        console.log(user)
        // let users = {
        //     user_name: user.user_name,
        //     user_password: user.user_password,
        //     user_firstname: user.user_firstname,
        //     user_lastname: user.user_lastname,
        //     authorized_id: value,
        // }
        // setUser({ ...user, ...users })
        // if (user.authorized_id == "0") {
        //     console.log(user.authorized_id)
        //     setUser({ ...user, authorized_id: user.authorized_id })
        // }
        // const int = parseInt(user.authorized_id)
        // console.log(int)
        // setUser({ ...user, authorized_id: int })
        // console.log(user)

        //setUser({ ...user, authorized_id: int })
        // console.log(int)
        // if (user.authorized_id == "1") {
        //     console.log('value == 1')
        //     const int = parseInt(user.authorized_id)
        //     setUser({ ...user, authorized_id: int })
        // }
        if (err) {
            axios.post("http://192.168.5.230:8080/upload/user", user).then((res) => {
                console.log(res.data)
                if (res.data.success == false) {
                    let errors = {
                        error_firstname: '',
                        error_lastname: '',
                        error_username: '',
                        error_password: '',
                    }
                    let errorChecks = {
                        errorChecks_firstname: '',
                        errorChecks_lastname: '',
                        errorChecks_username: '',
                        errorChecks_password: '',
                    }
                    errorChecks.errorChecks_username = true
                    errors.error_username = "Username เหมือนกันไม่ได้นะ เปลี่ยนใหม่ด้วย"
                    setErrorCheck({ ...errorCheck, ...errorChecks })
                    setError({ ...error, ...errors })
                } else {
                    alert("เพิ่มผู้ใช้งานแล้ว")
                    props.updateUser()
                    handleClose()
                }
            })
        }
    }


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
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="user_firstname"
                                                variant="outlined"
                                                placeholder="ชื่อ"
                                                fullWidth
                                                id="user_firtname"
                                                onChange={onChange}
                                                error={errorCheck.errorChecks_firstname}
                                                helperText={error.error_firstname}
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="user_lastname"
                                                placeholder="นามสกุล"
                                                name="user_lastname"
                                                autoComplete="lname"
                                                onChange={onChange}
                                                error={errorCheck.errorChecks_lastname}
                                                helperText={error.error_lastname}
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginTop: 10 }}>
                                        <Grid item xs={12} >
                                            <TextField
                                                autoComplete="fname"
                                                name="user_name"
                                                variant="outlined"
                                                placeholder="Username"
                                                required
                                                fullWidth
                                                id="user_name"
                                                onChange={onChange}
                                                error={errorCheck.errorChecks_username}
                                                helperText={error.error_username}
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginTop: 10 }}>
                                        <Grid item xs={12} >
                                            <TextField
                                                autoComplete="fname"
                                                name="user_password"
                                                variant="outlined"
                                                placeholder="Password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                required
                                                fullWidth
                                                id="user_password"
                                                onChange={onChange}
                                                error={errorCheck.errorChecks_password}
                                                helperText={error.error_password}
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                </form>
                            </Container>
                            <Typography className={classes.text} style={{ marginTop: 20 }}>สิทธิ์ผู้ใช้งาน</Typography>
                            <RadioGroup value={user.authorized_id} name="authorized_id" id='authorized_id' style={{ marginLeft: 100 }} onChange={onChangeRadio} >
                                <FormControlLabel value="1" checked={value1} control={<Radio />} label="ผู้ใช้งานระบบ" />
                                <FormControlLabel value="2" checked={value2} control={<Radio />} label="ผู้ดูแลระบบ" />
                            </RadioGroup>

                            <div className={classes.modalBtn} style={{ marginTop: 15 }}>
                                <Button variant="contained" className={classes.modalbtnSave} onClick={handleSubmit}  >
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
                        </div>
                    </div>
                </Fade>

            </Modal >
        </div >
    );
}