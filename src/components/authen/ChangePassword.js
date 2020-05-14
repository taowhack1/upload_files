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
import { signOut, changePassword } from "../../actions/authActions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import swal from "sweetalert";
import "./style.css";
import Hidden from '@material-ui/core/Hidden';

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
  const handleClose = () => {
    setOpen(false);
    let users = {
      user_id: authdata.user_id,
      user_password: "",
      user_password_old: "",
      user_firstname: authdata.user_firstname,
      user_lastname: authdata.user_lastname,
    };
    setUser({ ...user, ...users });
    setConfirm({ ...confirm, user_password_confirm: "" });
    setErrorCheck({});
    setError({});
    setValues({ ...values, showPassword: false });
  };

  const handleValidation = (e) => {
    let formIsValid = true;
    let errors = {
      error_password: "",
      error_password_old: "",
      error_password_confirm: "",
    };
    let errorChecks = {
      errorChecks_password: false,
      errorChecks_password_old: false,
      errorChecks_password_confirm: false,
    };
    if (user.user_password_old.length == 0) {
      formIsValid = false;
      errorChecks.errorChecks_password_old = true;
      errors.error_password_old = "กรุณากรอกรหัสผ่านเดิม";
    }
    if (user.user_password.length <= 7) {
      formIsValid = false;
      errorChecks.errorChecks_password = true;
      errors.error_password = "รหัสผ่านต้องมากกว่า 8 ตัว";
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
  const handleOpen = () => {
    setOpen(true);
    props.closeMenu();
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const changePasswordSignOut = () => {
    dispatch(signOut());
  };

  const onChange = (e) => {
    let value = e.target.value.replace(/[^A-Za-z\d]/gi, "");
    setUser({ ...user, [e.target.name]: value });
  };
  const onChangePass = (e) => {
    let value = e.target.value.replace(/[^A-Za-z\d]/gi, "");
    setConfirm({ ...confirm, [e.target.name]: value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = handleValidation();

    if (err) {
      dispatch(changePassword(user, changePasswordSignOut));
    }
  };

  return (
    <div>
      <Typography onClick={handleOpen} color="textPrimary">
        เปลี่ยนรหัสผ่าน
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
                <form className={classes.formStyle}>
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
                    value={user.user_password_old}
                    error={errorCheck.errorChecks_password_old}
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
                  <Typography className={classes.errorText}>
                    {error.error_password_old}
                  </Typography>
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
                    value={user.user_password}
                    error={errorCheck.errorChecks_password}
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
                  <Typography className={classes.errorText}>
                    {error.error_password}
                  </Typography>
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
                    value={confirm.user_password_confirm}
                    error={errorCheck.errorChecks_password_confirm}
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
                  <Typography className={classes.errorText}>
                    {error.error_password_confirm}
                  </Typography>
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
