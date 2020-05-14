import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import useStyles from "../files/StyleFiles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addRegistor } from '../../actions/authActions'

export default function Registor(props) {
  const { enqueueSnackbar } = useSnackbar();
  const snackAlert = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [user, setUser] = useState({
    user_name: "",
    user_password: "",
    user_firstname: "",
    user_lastname: "",
    authorized_id: 1,
  });
  const [errorCheck, setErrorCheck] = useState({});
  const [error, setError] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    let users = {
      user_name: "",
      user_password: "",
      user_firstname: "",
      user_lastname: "",
      authorized_id: 1,
    };
    setUser({ ...user, ...users });
    setError({});
    setErrorCheck({});
    setValue1(true);
    setValue2(false);
    setValues({ ...values, showPassword: false })
  };
  const onChange = (e) => {
    if (e.target.name == "user_firstname" || e.target.name == "user_lastname") {
      let value = e.target.value.replace(/[^A-Za-zก-๙\d]/gi, "");
      setUser({ ...user, [e.target.name]: value });
    }
    if (e.target.name == "user_name" || e.target.name == "user_password") {
      let value = e.target.value.replace(/[^A-Za-z\d]/gi, "");
      setUser({ ...user, [e.target.name]: value });
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeRadio = (e) => {
    if (e.target.value == "1") {
      setValue1(true);
      setValue2(false);
      console.log(e.target.value);
      setUser({ ...user, authorized_id: parseInt(e.target.value) });
    }
    if (e.target.value == "2") {
      setValue1(false);
      setValue2(true);
      console.log(e.target.value);
      setUser({ ...user, authorized_id: parseInt(e.target.value) });
    }
  };

  const validation = (e) => {
    let formIsValid = true;
    let errors = { error_firstname: "", error_lastname: "", error_username: "", error_password: "", };
    let errorChecks = { errorChecks_firstname: false, errorChecks_lastname: false, errorChecks_username: false, errorChecks_password: false, };
    if (user.user_firstname.length == 0) {
      formIsValid = false;
      errorChecks.errorChecks_firstname = true;
      errors.error_firstname = "กรุณากรอกชื่อ";
    }
    if (user.user_lastname.length == 0) {
      formIsValid = false;
      errorChecks.errorChecks_lastname = true;
      errors.error_lastname = "กรุณากรอกนามสกุล";
    }
    if (user.user_name.length <= 7) {
      formIsValid = false;
      errorChecks.errorChecks_username = true;
      errors.error_username = "ชื่อผู้ใช้งานต้องมากกว่า 8 ตัว";
    }
    if (user.user_name.length == 0) {
      formIsValid = false;
      errorChecks.errorChecks_username = true;
      errors.error_username = "กรุณากรอกชื่อผู้ใช้งาน";
    }
    if (user.user_password.length <= 7) {
      formIsValid = false;
      errorChecks.errorChecks_password = true;
      errors.error_password = "รหัสผ่านต้องมากกว่า 8 ตัว";
    }
    if (user.user_password.length == 0) {
      formIsValid = false;
      errorChecks.errorChecks_password = true;
      errors.error_password = "กรุณากรอกรหัสผ่าน";
    }

    setErrorCheck({ ...errorCheck, ...errorChecks });
    setError({ ...error, ...errors });
    return formIsValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validation();
    console.log(user);
    if (err) {
      dispatch(addRegistor(user, snackAlert, props.updateUser, handleClose))
    }
    // if (err) {
    //   axios.post("http://192.168.5.230:8s80/upload/user", user).then((res) => {
    //     console.log(res.data);
    //     if (res.data.success == false) {
    //       let errors = { error_firstname: "", error_lastname: "", error_username: "", error_password: "", };
    //       let errorChecks = {
    //         errorChecks_firstname: "", errorChecks_lastname: "", errorChecks_username: "", errorChecks_password: "",
    //       };
    //       errorChecks.errorChecks_username = true;
    //       errors.error_username = "Username เหมือนกันไม่ได้นะ เปลี่ยนใหม่ด้วย";
    //       setErrorCheck({ ...errorCheck, ...errorChecks });
    //       setError({ ...error, ...errors });
    //       snackAlert("ชื่อผู้ใช้งานมีอยู่ในระบบแล้ว", "warning");
    //     } else {
    //       snackAlert("เพิ่มผู้ใช้งานสำเร็จ", "success");
    //       props.updateUser();
    //       handleClose();
    //     }
    //   });
    // }
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
              <Container maxWidth="xl">
                <form
                  className={classes.formStyle}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="user_firstname"
                        variant="outlined"
                        placeholder="ชื่อ"
                        fullWidth
                        id="user_firtname"
                        onChange={onChange}
                        value={user.user_firstname}
                        error={errorCheck.errorChecks_firstname}
                        //helperText={error.error_firstname}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <Typography className={classes.errorTextRegistor}>{error.error_firstname}</Typography>
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
                        value={user.user_lastname}
                        error={errorCheck.errorChecks_lastname}
                        //helperText={error.error_lastname}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <Typography className={classes.errorTextRegistor}>{error.error_lastname}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: 10 }}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="user_name"
                        variant="outlined"
                        placeholder="Username"
                        required
                        fullWidth
                        id="user_name"
                        onChange={onChange}
                        value={user.user_name}
                        error={errorCheck.errorChecks_username}
                        //helperText={error.error_username}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <Typography className={classes.errorTextRegistor}>{error.error_username}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: 10 }}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="user_password"
                        variant="outlined"
                        placeholder="Password"
                        type={values.showPassword ? "text" : "password"}
                        fullWidth
                        id="user_password"
                        onChange={onChange}
                        value={user.user_password}
                        error={errorCheck.errorChecks_password}
                        //helperText={error.error_password}
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
                      <Typography className={classes.errorTextRegistor}>{error.error_password}</Typography>
                    </Grid>
                  </Grid>
                </form>
              </Container>
              <Typography className={classes.text} style={{ marginTop: 20 }}>
                สิทธิ์ผู้ใช้งาน
              </Typography>
              <RadioGroup
                value={user.authorized_id}
                name="authorized_id"
                id="authorized_id"
                style={{ marginLeft: 30, marginTop: 10 }}
                onChange={onChangeRadio}
              >
                <FormControlLabel
                  value="1"
                  checked={value1}
                  control={<Radio />}
                  label="ผู้ใช้งานระบบ"
                />
                <FormControlLabel
                  value="2"
                  checked={value2}
                  control={<Radio />}
                  label="ผู้ดูแลระบบ"
                />
              </RadioGroup>

              <div className={classes.modalBtn} style={{ marginTop: 15 }}>
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
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
