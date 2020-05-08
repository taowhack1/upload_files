import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Typography, Container } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import useStyles from "../files/StyleFiles";
import axios from "axios";
import { signOut } from "../../actions/authActions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import swal from "sweetalert";
import "./style.css";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddFolder(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [errorCheck, setErrorCheck] = useState({});
    const [error, setError] = useState({});
    const { authenticated, authdata } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        user_id: authdata.user_id,
        user_password: "",
        user_password_old: "",
        user_firstname: authdata.user_firstname,
        user_lastname: authdata.user_lastname,
    });

    const [confirm, setConfirm] = useState({
        user_password_confirm: "",
    });
    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleValidation = (e) => {
        let formIsValid = true;
        let errors = {
            error_password: "",
            error_password_old: "",
            error_password_confirm: "",
        };
        let errorChecks = {
            errorChecks_password: "",
            errorChecks_password_old: "",
            errorChecks_password_confirm: "",
        };
        console.log(
            user.user_password_old.length +
            " " +
            user.user_password.length +
            " " +
            confirm.user_password_confirm.length
        );
        if (user.user_password_old.length == 0) {
            formIsValid = false;
            errorChecks.errorChecks_password_old = true;
            errors.error_password_old = "กรุณากรอกรหัสผ่านเดิม";
        }
        if (user.user_password.length == 0) {
            formIsValid = false;
            errorChecks.errorChecks_password = true;
            errors.error_password = "กรุณากรอกรหัสผ่านใหม่";
        }
        if (confirm.user_password_confirm.length == 0) {
            formIsValid = false;
            errorChecks.errorChecks_password_confirm = true;
            errors.error_password_confirm = "กรุณากรอกรหัสผ่านเพื่อยืนยันอีกครั้ง";
        }
        if (
            user.user_password != confirm.user_password_confirm &&
            confirm.user_password_confirm.length != 0 &&
            user.user_password.length != 0
        ) {
            formIsValid = false;
            errorChecks.errorChecks_password_confirm = true;
            errors.error_password_confirm = "รหัสผ่านไม่ตรงกัน";
        }
        setErrorCheck({ ...errorCheck, ...errorChecks });
        setError({ ...error, ...errors });
        return formIsValid;
    };
    console.log(error);

    const handleOpen = () => {
        setOpen(true);
        props.closeMenu();
    };

    const handleClose = () => {
        setOpen(false);
        let errors = {};
        setError({});
        setUser({});
    };
    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        dispatch(signOut());
    };

    const onChange = (e) => {
        let value = e.target.value.replace(/[^A-Za-z\d]/gi, '');
        setUser({ ...user, [e.target.name]: value })
    };
    const onChangePass = (e) => {
        let value = e.target.value.replace(/[^A-Za-z\d]/gi, '');
        setConfirm({ ...confirm, [e.target.name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = handleValidation();
        // setErrorCheck(err)
        console.log(errorCheck);

        if (err) {
            axios
                .post("http://192.168.5.230:8080/upload/user/update", user)
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "เปลี่ยนรหัสผ่านแล้ว",
                            icon: "success",
                            button: "เข้าสู่ระบบ",
                        }).then((click) => {
                            click ? dispatch(signOut()) : dispatch(signOut());
                        });
                    } else {
                        swal({
                            title: "รหัสผ่านเดิมไม่ถูกต้อง",
                            icon: "error",
                            button: "ลองใหม่",
                        });
                    }
                });
        }
    };

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
                        <div className={classes.root}>
                            <Typography className={classes.text}>เปลี่ยนรหัสผ่าน</Typography>
                            <Container maxWidth="xs">
                                <form style={{ marginTop: 10 }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="user_password_old"
                                        placeholder="Current password"
                                        name="user_password_old"
                                        type={values.showPassword ? "text" : "password"}
                                        onChange={(e) => onChange(e)}
                                        error={errorCheck.errorChecks_password_old}
                                        helperText={error.error_password_old}
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
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                                <VisibilityOff />
                                                            )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="user_password"
                                        placeholder="New password"
                                        type={values.showPassword ? "text" : "password"}
                                        id="user_password"
                                        onChange={(e) => onChange(e)}
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
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                                <VisibilityOff />
                                                            )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        type={values.showPassword ? "text" : "password"}
                                        name="user_password_confirm"
                                        placeholder="Confirm password"
                                        id="user_password_confirm"
                                        onChange={onChangePass}
                                        error={errorCheck.errorChecks_password_confirm}
                                        helperText={error.error_password_confirm}
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
                                                        {values.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                                <VisibilityOff />
                                                            )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <div className={classes.modalBtn} style={{ marginTop: 5 }}>
                                        <Button
                                            variant="contained"
                                            className={classes.modalbtnSave}
                                            onClick={handleSubmit}
                                        >
                                            <Typography
                                                className={classes.text}
                                                color="textPrimary"
                                                elevation={0}
                                            >
                                                Save
                      </Typography>
                                        </Button>
                                        <Button
                                            color="primary"
                                            className={classes.modalbtnCancel}
                                            onClick={handleClose}
                                        >
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
            </Modal>
        </div>
    );
}
