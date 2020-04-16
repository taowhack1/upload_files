import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './Styles';
import Container from '@material-ui/core/Container';
import { signIn } from '../../actions/authActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReactLogo from './logo.svg';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SignIn = () => {
  const authenticated = useSelector((state) => state.authReducer.authenticated);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({
    user_name: '',
    user_password: '',
  });
  const [alerttitle, setAlerttitle] = useState('');
  const [opensnackbar, setOpensnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpensnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpensnackbar(false);
  };

  if (authenticated) {
    return <Redirect to='/' />;
  }
  const { user_name, user_password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    handleCloseSnackbar();
    if (user_name === '' || user_password === '') {
      //alert('Please fill in all fields', 'danger');
      setAlerttitle('กรุณาใส่ข้อมูลให้ครบถ้วน');
      handleOpenSnackbar();
    } else {
      dispatch(signIn(user));
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          ระบบจัดการเอกสารออนไลน์
        </Typography>
        <img src={ReactLogo} alt='React Logo' />
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='user_name'
            label='Username'
            name='user_name'
            autoComplete='email'
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='user_password'
            label='Password'
            type='password'
            id='user_password'
            autoComplete='current-password'
            onChange={onChange}
          />
          <Button
            type='submit'
            size='large'
            fullWidth
            variant='contained'
            color='primary'
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
          <Alert onClose={handleCloseSnackbar} severity='error'>
            {alerttitle}
          </Alert>
        </Snackbar>
        {/* <Alert severity='error'>This is an error message!</Alert>
        <Alert severity='warning'>This is a warning message!</Alert>
        <Alert severity='info'>This is an information message!</Alert>
        <Alert severity='success'>This is a success message!</Alert> */}
      </div>
    </Container>
  );
};

export default SignIn;
