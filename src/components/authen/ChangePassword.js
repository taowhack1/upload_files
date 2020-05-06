import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Typography, Container } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from "./Styles";
import axios from "axios";
import { signOut } from '../../actions/authActions';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddFolder(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [errorCheck, setErrorCheck] = useState(false);
    const [error, setError] = useState({
        error_password: '',
        error_password_old: '',
        error_password_confirm: '',
    })
    const { authenticated, authdata } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        user_id: authdata.user_id,
        user_password: '',
        user_password_old: '',
        user_firstname: authdata.user_firstname,
        user_lastname: authdata.user_lastname,
    });

    const [confirm, setConfirm] = useState({
        user_password_confirm: '',
    })
    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleValidation = (e) => {
        let formIsValid = true;
        let errors = {
            error_password: '',
            error_password_old: '',
            error_password_confirm: '',
        }
        console.log(user.user_password_old.length + " " + user.user_password.length + " " + confirm.user_password_confirm.length)


        if (user.user_password_old.length == 0) {
            formIsValid = false
            setErrorCheck(true)
            errors.error_password_old = "กรุณากรอกรหัสผ่านเดิม"
        }
        if (user.user_password.length == 0) {
            formIsValid = false
            setErrorCheck(true)
            errors.error_password = "กรุณากรอกรหัสผ่านใหม่"
        }
        if (confirm.user_password_confirm.length == 0) {
            formIsValid = false
            setErrorCheck(true)
            errors.error_password_confirm = "กรุณากรอกรหัสผ่านเพื่อยืนยันอีกครั้ง"
        }
        if (user.user_password != confirm.user_password_confirm && confirm.user_password_confirm.length != 0 && user.user_password.length != 0) {
            formIsValid = false
            setErrorCheck(true)
            errors.error_password_confirm = "รหัสผ่านไม่ตรงกัน"
        }
        setError({ ...error, ...errors })
        return formIsValid
    }
    console.log(error)

    const handleOpen = () => {
        setOpen(true);
        props.closeMenu()
    };

    const handleClose = () => {
        setOpen(false);
        let errors = {
            error_password: '',
            error_password_old: '',
            error_password_confirm: '',
        }
        setError({ ...error, ...errors })

    };
    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        dispatch(signOut());
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        const err = handleValidation()
    };
    const onChangePass = (e) => {
        setConfirm({ ...confirm, [e.target.name]: e.target.value })
        const err = handleValidation()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = handleValidation()
        setErrorCheck(err)
        console.log(errorCheck)

        if (err) {
            axios.post("http://192.168.5.230:8080/upload/user/update", user).then(res => {
                if (res.data.success) {
                    handleOpenAlert()
                    //dispatch(signOut());
                } else {
                    let errors = {
                        error_password: '',
                        error_password_old: '',
                        error_password_confirm: '',
                    }
                    errors.error_password_old = "กอดเสาเถียง"
                    setError({ ...error, ...errors })
                }
            })
        }
    }

    return (
        <div>
            <Typography onClick={handleOpen} color="textPrimary">
                ChangePassword
            </Typography>
            <Modal
                className={classes.modal}
                disableAutoFocus={true}
                outline="none"
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

                        <Container maxWidth="xs" >
                            <Typography align='center' className={classes.textPass}>เปลี่ยนรหัสผ่าน</Typography>
                            <form className={classes.form} >
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='user_password_old'
                                    placeholder="Current password"
                                    name='user_password_old'
                                    type={values.showPassword ? 'text' : 'password'}
                                    onChange={(e) => onChange(e)}
                                    error={errorCheck}
                                    helperText={error.error_password_old}
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

                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='user_password'
                                    placeholder="New password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    id='user_password'
                                    onChange={(e) => onChange(e)}
                                    error={errorCheck}
                                    helperText={error.error_password}
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
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    type={values.showPassword ? 'text' : 'password'}
                                    name='user_password_confirm'
                                    placeholder="Confirm password"
                                    id='user_password_confirm'
                                    onChange={onChangePass}
                                    error={errorCheck}
                                    helperText={error.error_password_confirm}
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

                                <Button
                                    onClick={handleSubmit}
                                    fontSize="large"
                                    fullWidth
                                    variant='contained'
                                    className={classes.form}
                                    style={{ backgroundColor: "#1976D2", color: "#FFFFF" }}
                                >
                                    <Typography className={classes.textColor}> Submit</Typography>
                                </Button>
                                <Button
                                    fontSize="large"
                                    fullWidth
                                    onClick={handleClose}
                                    style={{ marginTop: 10 }}
                                >
                                    <Typography color="inherit"> Cancel</Typography>
                                </Button>
                            </form>
                            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                                <Alert onClose={handleCloseAlert} severity="success">
                                    เปลี่ยนรหัสผ่านใหม่เรียบร้อยแล้ว
                                </Alert>
                            </Snackbar>
                        </Container>
                    </div>
                </Fade>
            </Modal >
        </div >
    );
}
