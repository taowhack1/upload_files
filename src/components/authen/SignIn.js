import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles";
import Container from "@material-ui/core/Container";
import { signIn } from "../../actions/authActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ReactLogo from "./logo.svg";
import { useSnackbar } from "notistack";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignIn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({
    user_name: "",
    user_password: "",
  });
  const [alerttitle, setAlerttitle] = useState("");
  const [opensnackbar, setOpensnackbar] = useState(false);

  const snackAlert = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
    });
  };

  const handleOpenSnackbar = () => {
    setOpensnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpensnackbar(false);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }
  const { user_name, user_password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    handleCloseSnackbar();
    if (user_name === "" || user_password === "") {
      //alert('Please fill in all fields', 'danger');
      snackAlert("กรุณากรอก Username , Password", "warning");
      //handleOpenSnackbar();
    } else {
      dispatch(signIn(user, snackAlert));
    }
  };

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className={classes.text}>
            ระบบจัดการเอกสารออนไลน์
          </Typography>
          <img src={ReactLogo} alt="React Logo" />
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user_name"
              placeholder="Username"
              name="user_name"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              InputProps={{
                className: classes.input,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="user_password"
              placeholder="Password"
              type="password"
              id="user_password"
              autoComplete="current-password"
              onChange={onChange}
              InputProps={{
                className: classes.input,
              }}
            />

            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              LOGIN
            </Button>
          </form>
          <Snackbar
            open={opensnackbar}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {alerttitle}
            </Alert>
          </Snackbar>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
